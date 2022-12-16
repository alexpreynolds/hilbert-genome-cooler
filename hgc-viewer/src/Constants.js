export const demoHgViewOptions = { 
    bounded: true,
    pixelPreciseMarginPadding: false,
    containerPaddingX: 0,
    containerPaddingY: 0,
    viewMarginTop: 0,
    viewMarginBottom: 0,
    viewMarginLeft: 0,
    viewMarginRight: 0,
    viewPaddingTop: 0,
    viewPaddingBottom: 0,
    viewPaddingLeft: 0,
    viewPaddingRight: 0 
};


export const demoDatasetMd = {
    filename: 'Boix_et_al_833_sample.hg19.18.All_833_biosamples.S1.scores.txt.gz',
};

export const demoHgViewconf = {
    "editable": false,
    "zoomFixed": false,
    "trackSourceServers": [
        "http://higlass.io/api/v1"
    ],
    "exportViewUrl": "http://higlass.io/api/v1/viewconfs/",
    "views": [
        {
        "uid": "aa",
        "initialXDomain": [
            7595655.0000270605,
            2507738795.9999733
        ],
        "initialYDomain": [
            -545671929.4383738,
            3061006380.438374
        ],
        "autocompleteSource": "http://higlass.io/api/v1/suggest/?d=OHJakQICQD6gTD7skx4EWA&",
        "chromInfoPath": "//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv",
        "tracks": {
            "top": [
            {
                "chromInfoPath": "//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv",
                "type": "horizontal-chromosome-labels",
                "height": 30,
                "uid": "I1QUF22JQJuJ38j9PS4iqw",
                "options": {
                "showMousePosition": false,
                "mousePositionColor": "#999999"
                },
                "width": 479
            }
            ],
            "left": [
            {
                "chromInfoPath": "//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv",
                "type": "vertical-chromosome-labels",
                "width": 30,
                "uid": "a-mFiHnBQ8uuI6UG3USWVA",
                "options": {
                "showMousePosition": false,
                "mousePositionColor": "#999999"
                },
                "height": 691
            }
            ],
            "center": [
            {
                "uid": "c1",
                "type": "combined",
                "height": 691,
                "contents": [
                {
                    "server": "http://higlass.io/api/v1",
                    "tilesetUid": "CQMd6V_cRw6iCI_-Unl3PQ",
                    "type": "heatmap",
                    "options": {
                    "colorRange": [
                        "#FFFFFF",
                        "#F8E71C",
                        "#F5A623",
                        "#D0021B"
                    ],
                    "colorbarPosition": "topRight",
                    "colorbarLabelsPosition": "outside",
                    "maxZoom": null,
                    "labelPosition": "bottomLeft",
                    "name": "Rao et al. (2014) GM12878 MboI (allreps) 1kb",
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "heatmapValueScaling": "log",
                    "scaleStartPercent": "0.00000",
                    "scaleEndPercent": "1.00000",
                    "backgroundColor": "#eeeeee",
                    "showMousePosition": false,
                    "mousePositionColor": "#999999",
                    "showTooltip": true
                    },
                    "uid": "heatmap1",
                    "width": 479,
                    "height": 691
                },
                {
                    "type": "2d-chromosome-grid",
                    "chromInfoPath": "//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv",
                    "server": "",
                    "tilesetUid": "TIlwFtqxTX-ndtM7Y9k1bw",
                    "uid": "LUVqXXu2QYiO8XURIwyUyA",
                    "options": {
                    "lineStrokeWidth": 1,
                    "lineStrokeColor": "grey"
                    },
                    "width": 479,
                    "height": 691
                }
                ],
                "options": {
                
                },
                "width": 479
            }
            ],
            "right": [
            {
                "chromInfoPath": "//s3.amazonaws.com/pkerp/data/hg19/chromSizes.tsv",
                "type": "vertical-chromosome-labels",
                "width": 30,
                "options": {
                "labelPosition": "outerBottom",
                "name": "Chromosome labels",
                "showMousePosition": false,
                "mousePositionColor": "#999999"
                },
                "uid": "VdplA_MaRuqvlKvJaCKpGA",
                "height": 691
            }
            ],
            "bottom": [
            ],
            "whole": [
            ],
            "gallery": [
            ]
        },
        "layout": {
            "w": 12,
            "h": 12,
            "x": 0,
            "y": 0
        },
        "genomePositionSearchBox": {
            "autocompleteServer": "http://higlass.io/api/v1",
            "chromInfoServer": "http://higlass.io/api/v1",
            "visible": false,
            "chromInfoId": "hg19",
            "autocompleteId": "OHJakQICQD6gTD7skx4EWA"
        }
        }
    ],
    "zoomLocks": {
        "locksByViewUid": {
        
        },
        "locksDict": {
        
        }
    },
    "locationLocks": {
        "locksByViewUid": {
        
        },
        "locksDict": {
        
        }
    },
    "valueScaleLocks": {
        "locksByViewUid": {
        
        },
        "locksDict": {
        
        }
    }
}