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
    name: 'Boix_et_al_833_sample.hg19.18.All_833_biosamples.S1',
};

/**
# python /home/higlass/projects/higlass-server/manage.py list_tilesets | grep hilbert11
tileset: Tileset [name: hilbert11.chromsizes.txt] [ft: chromsizes-tsv] [uuid: OiAkxtbaQdO-MdHRkjoc5Q]
tileset: Tileset [name: hilbert11.signal.mcool] [ft: cooler] [uuid: Vq1IgO7_QzONgHolTDLh2Q]
*/

export const demoHgViewconf = {
    "editable": false,
    "zoomFixed": false,
    "trackSourceServers": [
        "/app/v1",
        "http://higlass.io/api/v1"
    ],
    "exportViewUrl": "/api/v1/viewconfs/",
    "views": [
        {
        "uid": "aa",
        "initialXDomain": [
            -6124,
            8192
        ],
        "initialYDomain": [
            -6124,
            8192
        ],
        "tracks": {
            "top": [
            {
                "name": "hilbert11",
                "server": "http://meuleman-higlass-us-west-2.altius.org/api/v1",
                "type": "horizontal-chromosome-labels",
                "height": 0,
                "tilesetUid": "OiAkxtbaQdO-MdHRkjoc5Q",
                "uid": "hilbert11_chrom",
                "options": {
                    "showMousePosition": false,
                    "mousePositionColor": "#999999"
                },
                "width": 479
            }
            ],
            "left": [
            {
                "name": "hilbert11",
                "server": "http://meuleman-higlass-us-west-2.altius.org/api/v1",
                "type": "horizontal-chromosome-labels",
                "width": 0,
                "tilesetUid": "OiAkxtbaQdO-MdHRkjoc5Q",
                "uid": "hilbert11_chrom",
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
                    "server": "http://meuleman-higlass-us-west-2.altius.org/api/v1",
                    "tilesetUid": "Vq1IgO7_QzONgHolTDLh2Q",
                    "type": "heatmap",
                    "options": {
                        "colorRange": ['#ff0000', '#ff4500', '#ff4500', '#ff4500', '#008000', '#006400', '#c2e105', '#c2e105', '#ffc34d', '#ffc34d', '#ffff00', '#66cdaa', '#8a91d0', '#cd5c5c', '#bdb76b', '#808080', '#c0c0c0', '#ffffff'],
                        "colorbarPosition": "topRight",
                        "colorbarLabelsPosition": "outside",
                        "maxZoom": null,
                        "labelPosition": "bottomLeft",
                        "name": "Boix_et_al_833_sample.hg19.18.All_833_biosamples.S1",
                        "trackBorderWidth": 0,
                        "trackBorderColor": "black",
                        "heatmapValueScaling": "linear",
                        "scaleStartPercent": "0.00000",
                        "scaleEndPercent": "1.00000",
                        "backgroundColor": "#000000",
                        // "zeroValueColor":  "#000000",
                        "showMousePosition": false,
                        "mousePositionColor": "#999999",
                        "showTooltip": true,
                    },
                    "uid": "hilbert11_heatmap",
                    "width": 479,
                    "height": 691
                },
                {
                    "name": "hilbert11",
                    "server": "http://meuleman-higlass-us-west-2.altius.org/api/v1",
                    "type": "2d-chromosome-grid",
                    "tilesetUid": "OiAkxtbaQdO-MdHRkjoc5Q",
                    "uid": "hilbert11_chrom",
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
                "name": "hilbert11",
                "server": "http://meuleman-higlass-us-west-2.altius.org/api/v1",
                "type": "horizontal-chromosome-labels",
                "width": 0,
                "tilesetUid": "OiAkxtbaQdO-MdHRkjoc5Q",
                "uid": "hilbert11_chrom",
                "options": {
                    "showMousePosition": false,
                    "mousePositionColor": "#999999"
                },
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