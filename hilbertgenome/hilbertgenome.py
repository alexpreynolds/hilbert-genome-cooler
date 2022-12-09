import os 
import sys
import gzip
import h5py
import atexit
import cooler
import shutil
import hilbert
import tempfile
import subprocess
import numpy as np
import matplotlib.pyplot as plt
from collections import UserDict

from .chromsizes import *

CURVE_ORDER_MIN = 4
CURVE_ORDER_MAX = sys.maxsize
CURVE_ORDER_MAX_FOR_PLACEHOLDER_DATA = 10

class HilbertGenome:
    def __init__(self, 
                 assembly="hg38", 
                 pseudo_chromosome_name="hilbert", 
                 signal_fn=None, 
                 output_mcool_fn=None,
                 signal_resolution=1,
                ):
        self.assembly = assembly
        self.signal_fn = signal_fn
        if not self.signal_fn:
            sys.stderr.write("Note: Writing placeholder data; specify `signal_fn` argument for real data\n")
        
        self.output_mcool_fn = output_mcool_fn
        self.output_mcool_dir = os.path.split(os.path.abspath(self.output_mcool_fn))[0]
        if not self.output_mcool_fn:
            raise ValueError("Error: Must specify valid output mcool path")
        if not os.path.isdir(self.output_mcool_dir):
            raise ValueError("Error: Must specify valid output mcool parent directory: {}".format(self.output_mcool_dir))

        self.__chromsizes = chromsizes
        self.__temp_dir = tempfile.TemporaryDirectory()
        self.__signal_resolution = int(signal_resolution)
        
        #
        # set up curve order range and processing order
        #
        self.curve_order = UserDict({ 'min': CURVE_ORDER_MIN, 'max': self.__calculate_curve_order_max() })
        setattr(self.curve_order, 'min', self.curve_order['min'])
        setattr(self.curve_order, 'max', self.curve_order['max'])
        self.curve_orders = list(reversed(range(self.curve_order.min, self.curve_order.max + 1)))
        self.pseudo_chromosome_name = pseudo_chromosome_name
        self.bin_resolution = 2**self.curve_order.max * len(self.curve_orders)
        self.__chromsizes_fn = self.__generate_chromsizes_file()
        
        #
        # signal - read real data from file or generate placeholder data
        #
        self.signal = UserDict({})
        
        if not self.signal_fn:
            self.signal_range = UserDict({ 'min': 0, 'max': 2**self.curve_order.max })
            setattr(self.signal_range, 'min', self.signal_range['min'])
            setattr(self.signal_range, 'max', self.signal_range['max'])
            for co in self.curve_orders:
                self.__generate_placeholder_data_for_curve_order(co)
                
        else:
            pass # need code to read in gzip file and extract signal
        
        #
        # signal - process
        #
        if not self.signal_fn:
            for co in self.curve_orders:
                sys.stderr.write('Note: Processing signal for curve order {}...\n'.format(co))
                self.__generate_bg2_from_placeholder_data_for_curve_order(co)
                self.__convert_bg2_to_cooler_for_curve_order(co)
        else:
            pass # need code for processing real data per Observablehq algorithm
        
        #
        # generate mcool file
        #
        self.__tmp_mcool_fn = self.__mcool_file_from_cooler_files()
        
        #
        # validate mcool
        #
        if not cooler.fileops.is_multires_file(self.__tmp_mcool_fn):
            raise ValueError("Error: Multires file is not really mcool-formatted: {}".format(self.__tmp_mcool_fn))
        
        #
        # write temporary mcool to file
        #
        shutil.copy2(self.__tmp_mcool_fn, self.output_mcool_fn)
        
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
        cooler_obj = self.__cooler_object_for_curve_order(co)
        cooler_arr = cooler_obj.matrix(balance=False)[:, :].T
        fig = plt.figure(figsize=(12, 12))
        ax = fig.add_subplot(111)
        im = ax.matshow(cooler_arr, cmap='viridis', interpolation='nearest', vmin=self.signal_range.min, vmax=self.signal_range.max)
        return fig.colorbar(im)
    
    #
    # private methods
    #
    
    def __cleanup(self):
        sys.stderr.write('Note: Deleting temporary directory...\n')
        self.__temp_dir.cleanup()
        
    def __mcool_file_from_cooler_files(self):
        sys.stderr.write('Note: Creating mcool from cooler files...\n')
        output_mcool_fn = os.path.join(self.__temp_dir.name, 'bg2.signal.mcool')
        with h5py.File(output_mcool_fn, 'w') as output_mcool_h5:
            output_mcool_h5.attrs['format'] = 'HDF5::MCOOL'
            output_mcool_h5.attrs['format-version'] = 2
            output_mcool_h5.attrs['bin-type'] = 'fixed'
        for co in self.curve_orders:
            bin_size = self.__bin_size_for_curve_order(co)
            src_uri = os.path.join(self.__temp_dir.name, 'bg2.signal.{}.cool'.format(co))
            dst_uri = '{}::resolutions/{:d}'.format(output_mcool_fn, bin_size)
            if not cooler.fileops.is_cooler(src_uri):
                raise ValueError("Error: Per-resolution BG2 file is not formatted as a cooler: {}".format(src_uri))
            cooler.fileops.cp(src_uri, dst_uri, overwrite=False)
        return output_mcool_fn
    
    def __cooler_object_for_curve_order(self, co):
        if co < self.curve_order.min or co > self.curve_order.max:
            raise ValueError("Error: Curve order outside bounds: {}".format(co))
        cooler_fn = os.path.join(self.__temp_dir.name, 'bg2.signal.{}.cool'.format(co))
        if not os.path.exists(cooler_fn):
            raise FileNotFoundError("Error: Missing Cooler file data at {}".format(cooler_fn))
        cooler_obj = cooler.Cooler(cooler_fn)
        return cooler_obj
    
    def __convert_bg2_to_cooler_for_curve_order(self, co):
        input_signal_fn = os.path.join(self.__temp_dir.name, 'bg2.signal.{}.txt.gz'.format(co))
        if not os.path.exists(input_signal_fn):
            raise FileNotFoundError("Error: Missing BG2 pair data")
        output_cool_fn =  os.path.join(self.__temp_dir.name, 'bg2.signal.{}.cool'.format(co))
        bin_size = self.__bin_size_for_curve_order(co)
        cooler_load_cmd = 'cooler load -f bg2 --no-symmetric-upper {}:{:d} {} {}'.format(self.__chromsizes_fn, bin_size, input_signal_fn, output_cool_fn)
        try:
            subprocess.run(cooler_load_cmd, shell=True, check=True, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError as err:
            sys.stderr.write('Error: __convert_bg2_to_cooler_for_curve_order: {}\n'.format(err))
    
    def __bin_size_for_curve_order(self, co):
        return self.bin_resolution // 2**co
    
    def __generate_bg2_from_placeholder_data_for_curve_order(self, co):
        output_signal_fn = os.path.join(self.__temp_dir.name, 'bg2.signal.{}.txt.gz'.format(co))
        with gzip.open(output_signal_fn, 'wb') as ofh:
            signal_items = 4**co
            hilbert_locs = hilbert.decode(np.arange(signal_items), 2, co)
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
        items = 4**co
        self.signal[co] = np.linspace(self.signal_range.min, 
                                      self.signal_range.max + 1, 
                                      num=items, 
                                      endpoint=False, 
                                      retstep=False, 
                                      dtype=np.int32, 
                                      axis=0)
    
    def __calculate_curve_order_max(self):
        current_curve_order = CURVE_ORDER_MIN
        size_threshold = self.__assembly_total_size() // self.__signal_resolution
        assert(4**current_curve_order < size_threshold)
        if not self.signal_fn:
            current_curve_order = CURVE_ORDER_MAX_FOR_PLACEHOLDER_DATA
        else:
            while True:
                hilbert_curve_cells = 4**current_curve_order
                if hilbert_curve_cells >= size_threshold or hilbert_curve_cells == CURVE_ORDER_MAX:
                    break
                current_curve_order += 1
        return current_curve_order
    
    def __generate_chromsizes_file(self):
        chromsizes_fn = os.path.join(self.__temp_dir.name, 'chromsizes.txt')
        with open(chromsizes_fn, 'w') as ofh:
            chromosome_size = self.bin_resolution
            ol = '{}\t{}\n'.format(self.pseudo_chromosome_name, chromosome_size)
            ofh.write(ol)
        return chromsizes_fn
    
    def __assembly_total_size(self):
        return self.__chromsizes[self.assembly].total_size