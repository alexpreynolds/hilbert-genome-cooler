#!/usr/bin/env python

import io
import os
import requests
import hilbertgenome as hg

publication = 'Boix_et_al_833_sample'
assembly = 'hg19'
state = 18
groups = ['Male', 'Female']
saliency = 'S1'

for group in groups:
    data_dir = 'hilbert_genome_cooler_data'
    if not os.path.exists(data_dir): 
        os.makedirs(data_dir)
    mcool_fn = os.path.join(data_dir, '{}.{}.{}.{}.{}.signal.mcool'.format(publication, assembly, state, group, saliency))
    chromsizes_fn = os.path.join(data_dir, '{}.{}.{}.{}.{}.chromsizes.txt'.format(publication, assembly, state, group, saliency))
    
    #
    # ref. /net/seq/data/projects/Epilogos
    #          /multivec-for-browser-2022-redo/epilogos_tracks/single/human
    #          /Boix_et_al_833_sample/hg19/18/All_833_biosamples/S1/scores.txt.filledGap.versionSorted.txt.gz
    #
    signal_categories = 18
    signal_resolution = 200
    signal_remote_URI = 'https://resources.altius.org/~areynolds/public/{}.{}.{}.{}.{}.scores.txt.gz'.format(publication, assembly, state, group, saliency)
    signal_local_fn = os.path.join(data_dir, '{}.{}.{}.{}.{}.scores.txt.gz'.format(publication, assembly, state, group, saliency))
    if not os.path.exists(signal_local_fn):
        sys.stderr.write('Note: Downloading {} ...\n'.format(signal_remote_URI))
        try:
            r = requests.get(signal_remote_URI)
            with open(signal_local_fn, 'wb') as ofh:
                b = io.BytesIO(r.content)
                ofh.write(b.getbuffer())
        except requests.exceptions.RequestException as e:
            raise SystemExit(e)

    curve_order_min = 4
    curve_order_max = 11
    pseudo_chromosome_name = 'hilbert{}'.format(curve_order_max)

    hgo = hg.HilbertGenome(assembly=assembly, 
                           input_signal_fn=signal_local_fn,
                           input_signal_categories=signal_categories,
                           input_signal_resolution=signal_resolution, 
                           curve_order_min=curve_order_min,
                           curve_order_max=curve_order_max,
                           output_mcool_fn=mcool_fn,
                           output_chromsizes_fn=chromsizes_fn,
                           pseudo_chromosome_name=pseudo_chromosome_name)
