import os 
import sys
import gzip
import h5py
import json
import math
import atexit
import cooler
import random
import shutil
import hilbert
import tempfile
import subprocess
import numpy as np
from matplotlib import colors
import matplotlib.pyplot as plt
from collections import UserDict

from .chromsizes import *

CURVE_ORDER_MIN_OVERRIDE = 4
CURVE_ORDER_MAX_OVERRIDE = sys.maxsize
CURVE_ORDER_MAX_OVERRIDE_FOR_PLACEHOLDER_DATA = 8
SIGNAL_RESOLUTION_MIN = 1

class HilbertGenome:
    def __init__(self, 
                 assembly='hg38', 
                 pseudo_chromosome_name='hilbert', 
                 input_signal_fn=None,
                 input_signal_categories=18,
                 input_signal_resolution=1,
                 NA_category_label=None,
                 curve_order_min=None,
                 curve_order_max=None,
                 chromosomes_to_exclude=['chrY'],
                 output_mcool_fn=None,
                 output_chromsizes_fn=None
                ):
        self.assembly = assembly
        self.input_signal_fn = input_signal_fn
        self.__input_signal_categories = int(input_signal_categories)
        self.__input_signal_NA_category_value = self.__input_signal_categories - 1 if not NA_category_label else NA_category_label
        self.__chromosomes_to_exclude = chromosomes_to_exclude
        self.__placeholder_data = False
        if not self.input_signal_fn:
            sys.stderr.write('Note: Writing placeholder data; specify `input_signal_fn` argument for real data\n')
            self.__placeholder_data = True
        
        self.output_mcool_fn = output_mcool_fn
        self.output_mcool_dir = os.path.split(os.path.abspath(self.output_mcool_fn))[0]
        if not self.output_mcool_fn:
            raise ValueError('Error: Must specify valid output mcool path')
        if not os.path.isdir(self.output_mcool_dir):
            raise ValueError('Error: Must specify valid output mcool parent directory: {}'.format(self.output_mcool_dir))
            
        self.output_chromsizes_fn = output_chromsizes_fn
        self.output_chromsizes_dir = os.path.split(os.path.abspath(self.output_chromsizes_fn))[0]
        if not self.output_chromsizes_fn:
            raise ValueError('Error: Must specify valid output chromsizes path')
        if not os.path.isdir(self.output_chromsizes_dir):
            raise ValueError('Error: Must specify valid output chromsizes parent directory: {}'.format(self.output_chromsizes_dir))

        self.__chromsizes = chromsizes
        self.__genome = self.__chromsizes[self.assembly]
        self.__n_chromosomes = len(self.__genome.chromosomes)
        self.__temp_dir = tempfile.TemporaryDirectory()
        self.__input_signal_resolution = int(input_signal_resolution)
        if self.__input_signal_resolution < SIGNAL_RESOLUTION_MIN:
            raise ValueError('Error: Must specify positive, non-zero base signal resolution: {}'.format(self.__input_signal_resolution))
        
        #
        # set up curve order range and processing order
        #
        if not curve_order_min or not curve_order_max:
            self.curve_order = UserDict({ 'min': CURVE_ORDER_MIN_OVERRIDE, 'max': self.__calculate_curve_order_max() })
        else:
            self.curve_order = UserDict({ 'min': curve_order_min, 'max': curve_order_max })
        setattr(self.curve_order, 'min', self.curve_order['min'])
        setattr(self.curve_order, 'max', self.curve_order['max'])
        try:
            assert(self.curve_order.min >= math.log(self.__n_chromosomes) / math.log(4))
            assert(self.curve_order.max < sys.maxsize)
        except AssertionError as err:
            sys.stderr.write('Error: Must specify sensible min and max curve bounds\n')
            sys.exit(-1)
        self.curve_orders = list(reversed(range(self.curve_order.min, self.curve_order.max + 1)))
        self.pseudo_chromosome_name = pseudo_chromosome_name
        self.bin_resolution = 2**self.curve_order.max
        self.__chromsizes_fn = self.__generate_chromsizes_file()
        self.__signal_resolutions = self.__calculate_curve_order_resolutions(self.curve_order.min, self.curve_order.max)
        # print(self.__signal_resolutions)
        
        #
        # signal - process real data from file or generate placeholder data
        #
        self.signal = UserDict({})
        
        if self.__placeholder_data:
            self.signal_range = UserDict({ 'min': 0, 'max': 2**self.curve_order.max })
            setattr(self.signal_range, 'min', self.signal_range['min'])
            setattr(self.signal_range, 'max', self.signal_range['max'])
            for co in self.curve_orders:
                sys.stderr.write('Note: Processing signal for curve order {}...\n'.format(co))
                self.__generate_placeholder_data_for_curve_order(co)
                self.__generate_bg2_from_placeholder_data_for_curve_order(co)
                self.__convert_bg2_to_cooler_for_curve_order(co)
                
        else:
            self.signal_range = UserDict({ 'min': 0, 'max': self.__input_signal_categories - 1 })
            setattr(self.signal_range, 'min', self.signal_range['min'])
            setattr(self.signal_range, 'max', self.signal_range['max'])
            self.__prepare_real_data()
            self.__aggregated_data_by_curve_order = {}
            self.__base_order = math.log(self.__genome.total_size) / math.log(4)
            for co in self.curve_orders:
                sys.stderr.write('Note: Processing signal for curve order {}...\n'.format(co))
                # self.__generate_real_data_per_chromosome_for_curve_order(co)
                self.__generate_real_data_for_curve_order(co, self.__base_order)
                self.__generate_bg2_from_real_data_for_curve_order(co)
                self.__convert_bg2_to_cooler_for_curve_order(co)
        
        #
        # generate mcool file
        #
        self.__tmp_mcool_fn = self.__mcool_file_from_cooler_files()
        
        #
        # validate mcool
        #
        if not cooler.fileops.is_multires_file(self.__tmp_mcool_fn):
            raise ValueError('Error: Multires file is not really mcool-formatted: {}'.format(self.__tmp_mcool_fn))
        
        #
        # write temporary mcool and chromsizes to file
        #
        shutil.copy2(self.__tmp_mcool_fn, self.output_mcool_fn)
        shutil.copy2(self.__chromsizes_fn, self.output_chromsizes_fn)
        
        #
        # clean up temporary directory upon exiting Python
        #
        atexit.register(self.__cleanup)


    #
    # public methods
    #
    
    def cooler_info_for_curve_order(self, co):
        cooler_obj = self.__cooler_object_for_curve_order(co)
        return cooler_obj.info


    def cooler_plot_for_curve_order(self, co):
        #
        # TODO: Abstract out colormap to separate class:
        # /net/seq/data/projects/Epilogos/epilogos-metadata/human/Adsera_et_al_833_sample/hg38/18/metadata.tsv
        #
        hex_colormap = ['#ff0000', 
                        '#ff4500', 
                        '#ff4500', 
                        '#ff4500', 
                        '#008000', 
                        '#006400', 
                        '#c2e105', 
                        '#c2e105', 
                        '#ffc34d', 
                        '#ffc34d', 
                        '#ffff00', 
                        '#66cdaa', 
                        '#8a91d0', 
                        '#cd5c5c', 
                        '#bdb76b', 
                        '#808080', 
                        '#c0c0c0', 
                        '#ffffff']
        cmap = colors.ListedColormap([self.__hex_to_float_rgb(x) for x in hex_colormap])
        bounds = list(range(self.signal_range.min, self.signal_range.max + 1))
        norm = colors.BoundaryNorm(bounds, cmap.N)
        #
        # plot cooler with application of custom colormap
        #
        cooler_obj = self.__cooler_object_for_curve_order(co)
        cooler_arr = cooler_obj.matrix(balance=False)[:, :].T
        fig = plt.figure(figsize=(12, 12))
        ax = fig.add_subplot(111)
        im = ax.matshow(cooler_arr, cmap=cmap, interpolation='nearest', vmin=self.signal_range.min, vmax=self.signal_range.max)
        plt.title('Curve order {}'.format(co))
        return fig.colorbar(im)


    #
    # private methods
    #
    
    def __cleanup(self):
        sys.stderr.write('Note: Deleting temporary directory...\n')
        self.__temp_dir.cleanup()


    def __hex_to_float_rgb(self, h):
        h = h.lstrip('#')
        return [float(int(h[i:i+2], 16)) / 255.0 for i in (0, 2, 4)]


    def __mcool_file_from_cooler_files(self):
        sys.stderr.write('Note: Creating mcool from cooler files...\n')
        output_mcool_fn = os.path.join(self.__temp_dir.name, 'signal.mcool')
        with h5py.File(output_mcool_fn, 'w') as output_mcool_h5:
            output_mcool_h5.attrs['format'] = 'HDF5::MCOOL'
            output_mcool_h5.attrs['format-version'] = 2
            output_mcool_h5.attrs['bin-type'] = 'fixed'
        for co in self.curve_orders:
            bin_size = self.__bin_size_for_curve_order(co)
            src_uri = os.path.join(self.__temp_dir.name, 'signal.{}.cool'.format(co))
            dst_uri = '{}::resolutions/{:d}'.format(output_mcool_fn, bin_size)
            if not os.path.exists(src_uri):
                raise ValueError('Error: Per-resolution BG2 file does not exist: {}'.format(src_uri))
            if not cooler.fileops.is_cooler(src_uri):
                raise ValueError('Error: Per-resolution BG2 file is not formatted as a cooler: {}'.format(src_uri))
            cooler.fileops.cp(src_uri, dst_uri, overwrite=False)
        return output_mcool_fn


    def __cooler_object_for_curve_order(self, co):
        if co < self.curve_order.min or co > self.curve_order.max:
            raise ValueError('Error: Curve order outside bounds: {}'.format(co))
        cooler_fn = os.path.join(self.__temp_dir.name, 'signal.{}.cool'.format(co))
        if not os.path.exists(cooler_fn):
            raise FileNotFoundError('Error: Missing Cooler file data at {}'.format(cooler_fn))
        cooler_obj = cooler.Cooler(cooler_fn)
        return cooler_obj


    def __convert_bg2_to_cooler_for_curve_order(self, co):
        input_bg2_fn = os.path.join(self.__temp_dir.name, 'signal.{}.txt.gz'.format(co))
        if not os.path.exists(input_bg2_fn):
            raise FileNotFoundError('Error: Missing BG2 pair data')
        output_cool_fn =  os.path.join(self.__temp_dir.name, 'signal.{}.cool'.format(co))
        bin_size = self.__bin_size_for_curve_order(co)
        cooler_load_cmd = 'cooler load -f bg2 --no-symmetric-upper {}:{:d} {} {}'.format(self.__chromsizes_fn, bin_size, input_bg2_fn, output_cool_fn)
        try:
            subprocess.run(cooler_load_cmd, shell=True, check=True, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError as err:
            sys.stderr.write('Error: __convert_bg2_to_cooler_for_curve_order: {}\n'.format(err))


    def __bin_size_for_curve_order(self, co):
        return self.bin_resolution // 2**co


    def __generate_bg2_from_placeholder_data_for_curve_order(self, co):
        output_bg2_fn = os.path.join(self.__temp_dir.name, 'signal.{}.txt.gz'.format(co))
        with gzip.open(output_bg2_fn, 'wb') as ofh:
            n_items = 4**co
            hilbert_locs = hilbert.decode(np.arange(n_items), 2, co)
            reordered_idxs = np.lexsort((hilbert_locs[:,1], hilbert_locs[:,0]))
            reordered_signal = self.signal[co][reordered_idxs]
            bin_size = self.__bin_size_for_curve_order(co)
            for loc_idx, loc_val in enumerate(hilbert_locs[reordered_idxs]):
                chrom1 = self.pseudo_chromosome_name
                start1 = loc_val[0] * bin_size
                end1 = (loc_val[0] + 1) * bin_size
                chrom2 = self.pseudo_chromosome_name
                start2 = loc_val[1] * bin_size
                end2 = (loc_val[1] + 1) * bin_size
                score = reordered_signal[loc_idx]
                ol = '{}\t{:d}\t{:d}\t{}\t{:d}\t{:d}\t{:d}\n'.format(chrom1, 
                                                                     int(start1), 
                                                                     int(end1), 
                                                                     chrom2, 
                                                                     int(start2), 
                                                                     int(end2), 
                                                                     int(score))
                ofh.write(ol.encode('utf-8'))


    def __generate_placeholder_data_for_curve_order(self, co):
        n_items = 4**co
        self.signal[co] = np.linspace(self.signal_range.min, 
                                      self.signal_range.max + 1, 
                                      num=n_items, 
                                      endpoint=False, 
                                      retstep=False, 
                                      dtype=np.int32, 
                                      axis=0)


    def __calculate_curve_order_max(self):
        current_curve_order = CURVE_ORDER_MIN_OVERRIDE
        size_threshold = self.__assembly_total_size() // self.__input_signal_resolution
        assert(4**current_curve_order < size_threshold)
        if self.__placeholder_data:
            current_curve_order = CURVE_ORDER_MAX_OVERRIDE_FOR_PLACEHOLDER_DATA
        else:
            while True:
                hilbert_curve_cells = 4**current_curve_order
                if hilbert_curve_cells >= size_threshold or hilbert_curve_cells == CURVE_ORDER_MAX_OVERRIDE:
                    break
                current_curve_order += 1
        return current_curve_order


    def __calculate_curve_order_resolutions(self, co_min, co_max):
        co_current = co_min
        size_threshold = self.__assembly_total_size() // self.__input_signal_resolution
        # print(size_threshold)
        while True:
            curve_cells = 4**co_current
            if curve_cells >= size_threshold or curve_cells == CURVE_ORDER_MAX_OVERRIDE:
                break
            co_current += 1
        resolutions = {}
        res_current = self.__input_signal_resolution
        if co_current > co_max:
            sys.stderr.write('Note: Custom curve order maximum ({}) is less than optimum calculated maximum ({})\n'.format(co_max, co_current))
        for co in range(co_current, co_min - 1, -1):
            if co <= co_max:
                resolutions[co] = res_current
            res_current *= 2
        return resolutions


    def __generate_chromsizes_file(self):
        chromsizes_fn = os.path.join(self.__temp_dir.name, 'chromsizes.txt')
        with open(chromsizes_fn, 'w') as ofh:
            chromosome_size = self.bin_resolution
            ol = '{}\t{}\n'.format(self.pseudo_chromosome_name, chromosome_size)
            ofh.write(ol)
        return chromsizes_fn


    def __assembly_total_size(self):
        return self.__genome.total_size


    def __is_gz_file(self, ifn):
        with open(ifn, 'rb') as ifh:
            return ifh.read(2) == b'\x1f\x8b'


    def __generate_categorical_data(self, ifn):
        signals = {}
        signals['__all'] = []
        with gzip.open(ifn, 'rb') as ifh:
            for line in ifh:
                elems = line.decode().rstrip().split('\t')
                chromosome = elems[0]
                signal = np.array([float(x) for x in elems[3:]])
                if chromosome not in signals:
                    signals[chromosome] = []
                if chromosome not in self.__chromosomes_to_exclude:
                    signals[chromosome].append({'argmax': np.argmax(signal), 'sum': np.sum(signal)})
                    signals['__all'].append({'argmax': np.argmax(signal), 'sum': np.sum(signal)})
                else:
                    signals[chromosome].append({'argmax': self.__input_signal_NA_category_value, 'sum': 0})
                    signals['__all'].append({'argmax': self.__input_signal_NA_category_value, 'sum': 0})
        return signals


    def __generate_categorical_data_file(self, ofn, categorical_data):
        with gzip.open(ofn, 'wb') as ofh:
            categorical_data_json = json.dumps(categorical_data, cls=NumpyEncoder)
            ofh.write(categorical_data_json.encode())


    def __prepare_real_data(self):
        if not self.__is_gz_file(self.input_signal_fn):
            raise ValueError('Error: Input signal file is not gzipped')
        self.__input_signal_dir = os.path.split(os.path.abspath(self.input_signal_fn))[0]
        #
        # categorical data
        #
        self.__categorical_data_fn = os.path.join(self.__input_signal_dir, '{}.categorical_data.json.gz'.format(os.path.basename(self.input_signal_fn)))
        if not os.path.exists(self.__categorical_data_fn):
            sys.stderr.write('Note: Processing maxvecsum attributes of categorical data from input signal file\n')
            self.__categorical_data = self.__generate_categorical_data(self.input_signal_fn)
            self.__generate_categorical_data_file(self.__categorical_data_fn, self.__categorical_data)
        else:
            with gzip.open(self.__categorical_data_fn, 'rb') as ifh:
                self.__categorical_data = json.load(ifh)


    def __generate_real_data_for_curve_order(self, co, bo):
        signal_resolution_for_co = self.__signal_resolutions[co]
        self.__aggregated_data_by_curve_order[co] = {}
        #
        # iterate over chromosomes
        #
        find_maxvecsum_label = lambda x: x[np.argmax(np.array([i['sum'] for i in x]))]['argmax']
        base_position_to_curve_order = lambda a : math.floor(a / math.pow(4, bo - co))
        linear_rescale = lambda val, i_min, i_max, o_min, o_max: o_min + (val - i_min) * ((o_max - o_min) / (i_max - i_min))
        linear_rescale_by_chromosome = lambda val, samples, chrom : linear_rescale(val, 
                                                                                   0, 
                                                                                   samples, 
                                                                                   base_position_to_curve_order(self.__genome.sizes_acc[chrom]),
                                                                                   base_position_to_curve_order(self.__genome.sizes_acc[chrom] + self.__genome.sizes[chrom]))
        self.__aggregated_data_by_curve_order[co] = {}
        for chromosome in self.__genome.chromosomes:
            try:
                self.__aggregated_data_by_curve_order[co][chromosome] = []
                data_by_chromosome = self.__categorical_data[chromosome]
                # total_samples = len(data_by_chromosome) if len(data_by_chromosome) < 4**co * co else 4**co * co
                total_samples = len(data_by_chromosome) if len(data_by_chromosome) < 4**co * co else 4**co * co
                old_scaled_point = -1
                data_to_aggregate = []
                for datum_idx in range(total_samples):
                    scaled_point = math.floor(linear_rescale_by_chromosome(datum_idx, total_samples, chromosome))
                    try:
                        scaled_point_signal_datum = data_by_chromosome[datum_idx]
                    except IndexError:
                        sys.stderr.write('Error: chromosome {} | curve order {} | total_samples {} | len(data_by_chromosome) {} | 4**co * co {}\n'.format(chromosome, co, total_samples, len(data_by_chromosome), 4**co * co))
                        sys.exit(-1)
                    if scaled_point != old_scaled_point:
                        # aggregate data_to_aggregate
                        if len(data_to_aggregate) > 0:
                            aggregated_data = find_maxvecsum_label(data_to_aggregate)
                            self.__aggregated_data_by_curve_order[co][chromosome].append(aggregated_data)
                        # reset data_to_aggregate
                        data_to_aggregate = []
                        old_scaled_point = scaled_point
                    data_to_aggregate.append(scaled_point_signal_datum)
                if len(data_to_aggregate) > 0:
                    aggregated_data = find_maxvecsum_label(data_to_aggregate)
                    self.__aggregated_data_by_curve_order[co][chromosome].append(aggregated_data)
                sys.stderr.write('{}... '.format(chromosome))
            except KeyError:
                pass
        sys.stderr.write('\n')


    def __flatten_list_of_sublists(self, parent_list):
        return [item for sublist in parent_list for item in sublist]


    def __generate_bg2_from_real_data_for_curve_order(self, co):
        output_bg2_fn = os.path.join(self.__temp_dir.name, 'signal.{}.txt.gz'.format(co))
        with gzip.open(output_bg2_fn, 'wb') as ofh:
            signal_items = np.array(self.__flatten_list_of_sublists([self.__aggregated_data_by_curve_order[co][x] for x in self.__genome.chromosomes]))
            n_items_observed = len(signal_items)
            n_items_expected = 4**co
            try:
                assert(n_items_observed == n_items_expected)
            except AssertionError as err:
                sys.stderr.write('Warning: Observed items count({}) different from expected items count ({}) for curve order {} - padding last chromosome with NA label\n'.format(n_items_observed, n_items_expected, co))
                last_chromosome = self.__genome.chromosomes[-1]
                n_slop_items = n_items_expected - n_items_observed
                if n_slop_items < 0:
                    raise ValueError('Error: More observed items than expected items\n')
                self.__aggregated_data_by_curve_order[co][last_chromosome] += [self.__input_signal_NA_category_value] * n_slop_items
            signal_items = np.array(self.__flatten_list_of_sublists([self.__aggregated_data_by_curve_order[co][x] for x in self.__genome.chromosomes]))
            hilbert_locs = hilbert.decode(np.arange(n_items_expected), 2, co)
            reordered_idxs = np.lexsort((hilbert_locs[:,1], hilbert_locs[:,0]))
            reordered_signal = signal_items[reordered_idxs]
            bin_size = self.__bin_size_for_curve_order(co)
            for loc_idx, loc_val in enumerate(hilbert_locs[reordered_idxs]):
                chrom1 = self.pseudo_chromosome_name
                start1 = loc_val[0] * bin_size
                end1 = (loc_val[0] + 1) * bin_size
                chrom2 = self.pseudo_chromosome_name
                start2 = loc_val[1] * bin_size
                end2 = (loc_val[1] + 1) * bin_size
                score = reordered_signal[loc_idx]
                ol = '{}\t{:d}\t{:d}\t{}\t{:d}\t{:d}\t{:d}\n'.format(chrom1, 
                                                                     int(start1), 
                                                                     int(end1), 
                                                                     chrom2, 
                                                                     int(start2), 
                                                                     int(end2), 
                                                                     int(score))
                ofh.write(ol.encode('utf-8'))


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        if isinstance(obj, np.floating):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        if isinstance(obj, np.bool_):
            return bool(obj)
        return super(NumpyEncoder, self).default(obj)