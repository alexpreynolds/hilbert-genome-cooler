import requests
import tempfile
from natsort import natsorted, ns
from collections import UserDict

'''
Similar to UCSC fetchChromSizes, but we return a bit more data and 
package it with some nice user-friendly attributes. Additional assemblies
can be added here, as needed.
'''

_MD = {
    'root': {
        'assemblies': ['hg19', 'hg38', 'mm10'],
        'URI_template': 'http://hgdownload.soe.ucsc.edu/goldenPath/<db>/bigZips/<db>.chrom.sizes'  
    },
}

class Chromsizes:
    def __init__(self, chromsizes=UserDict({'assemblies':[]}), filter_non_nuclear_chroms=True, chromosome_blacklist=['chrM']):
        self.chromsizes = chromsizes
        self.filter_non_nuclear_chroms = filter_non_nuclear_chroms
        self.chromosome_blacklist = chromosome_blacklist

        with tempfile.TemporaryDirectory() as tmp_dir:
            for assembly in _MD['root']['assemblies']:
                root_URI = _MD['root']['URI_template'].replace('<db>', assembly)
                try:
                    r = requests.get(root_URI)
                    assembly_obj = UserDict({
                        'chromosomes': [],
                        'sizes': {},
                        'total_size': 0,
                    })
                    for line in r.text.split('\n'):
                        elems = line.split('\t')
                        #
                        # empty line
                        #
                        if len(elems) == 1 and len(elems[0]) == 0:
                            continue
                        #
                        # bad line
                        #
                        if len(elems) != 2:
                            raise ValueError('Chromsizes request {} malformed? [{}]'.format(root_URI, elems))
                        chromosome = elems[0]
                        size = int(elems[1])
                        #
                        # handle non-nuclear chromosome names
                        #
                        if self.filter_non_nuclear_chroms and '_' in chromosome:
                            continue
                        #
                        # handle blacklisted chromosome names
                        #
                        if chromosome in self.chromosome_blacklist:
                            continue
                        assembly_obj['chromosomes'].append(chromosome)
                        assembly_obj['sizes'][chromosome] = size
                        assembly_obj['total_size'] += size
                    #
                    # chromosome list has natural sort applied to it (e.g., "chr1, chr2, ..., chrY")
                    #
                    assembly_obj['chromosomes'] = natsorted(assembly_obj['chromosomes'], alg=ns.IGNORECASE)
                    self.chromsizes[assembly] = assembly_obj
                    self.chromsizes['assemblies'].append(assembly)
                    self.chromsizes[assembly]['sizes']['__acc_ns'] = {}
                    acc = 0
                    for chromosome in assembly_obj['chromosomes']:
                        self.chromsizes[assembly]['sizes']['__acc_ns'][chromosome] = acc
                        acc += self.chromsizes[assembly]['sizes'][chromosome]
                except requests.exceptions.RequestException as e:
                    raise SystemExit(e)

        #
        # set attributes
        #
        self.chromsizes.assemblies = chromsizes['assemblies']
        for assembly in _MD['root']['assemblies']:
            setattr(self.chromsizes, assembly, chromsizes[assembly])
            assembly_attr = getattr(self.chromsizes, assembly)
            setattr(assembly_attr, 'chromosomes', chromsizes[assembly]['chromosomes'])
            setattr(assembly_attr, 'sizes', chromsizes[assembly]['sizes'])
            setattr(assembly_attr, 'sizes_acc', chromsizes[assembly]['sizes']['__acc_ns'])
            setattr(assembly_attr, 'total_size', chromsizes[assembly]['total_size'])

_CS = Chromsizes(filter_non_nuclear_chroms=True)
chromsizes = _CS.chromsizes