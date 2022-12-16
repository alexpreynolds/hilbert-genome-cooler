import React, { Component } from "react";

// higlass
// cf. https://www.npmjs.com/package/higlass
import "higlass/dist/hglib.css";
import { HiGlassComponent } from "higlass";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hgViewKey: 0,
      hgViewconf: {
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
                  "server": "http://higlass.io/api/v1",
                  "tilesetUid": "b6qFe7fOSnaX-YkP2kzN1w",
                  "uid": "WCGssXHmQTGOkdRgweYKkQ",
                  "type": "horizontal-bar",
                  "options": {
                    "labelColor": "black",
                    "labelPosition": "topLeft",
                    "axisPositionHorizontal": "right",
                    "barFillColor": "darkgreen",
                    "valueScaling": "linear",
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "labelTextOpacity": 0.4,
                    "barOpacity": 1,
                    "name": "wgEncodeSydhTfbsGm12878Ctcfsc15914c20StdSig"
                  },
                  "width": 479,
                  "height": 20
                },
                {
                  "server": "http://higlass.io/api/v1",
                  "tilesetUid": "CQMd6V_cRw6iCI_-Unl3PQ",
                  "uid": "YLnxkBvQQxG-UNLxP9wR8g",
                  "type": "horizontal-heatmap",
                  "options": {
                    "labelPosition": "bottomRight",
                    "labelColor": "black",
                    "colorRange": [
                      "white",
                      "rgba(245,166,35,1.0)",
                      "rgba(208,2,27,1.0)",
                      "black"
                    ],
                    "maxZoom": null,
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "name": "Rao et al. (2014) GM12878 MboI (allreps) 1kb",
                    "backgroundColor": "#eeeeee"
                  },
                  "width": 479,
                  "height": 85
                },
                {
                  "server": "http://higlass.io/api/v1",
                  "tilesetUid": "OHJakQICQD6gTD7skx4EWA",
                  "uid": "BEEMEjU7QCa2krDO9C0yOQ",
                  "type": "horizontal-gene-annotations",
                  "options": {
                    "labelPosition": "outerTop",
                    "name": "Gene Annotations (hg19)",
                    "labelColor": "black",
                    "plusStrandColor": "blue",
                    "minusStrandColor": "red",
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "showMousePosition": false,
                    "mousePositionColor": "#999999"
                  },
                  "width": 479,
                  "height": 60
                },
                {
                  "server": "http://higlass.io/api/v1",
                  "tilesetUid": "F2vbUeqhS86XkxuO1j2rPA",
                  "type": "horizontal-line",
                  "options": {
                    "labelColor": "red",
                    "labelPosition": "outerLeft",
                    "axisPositionHorizontal": "right",
                    "lineStrokeColor": "blue",
                    "name": "wgEncodeSydhTfbsGm12878Rad21IggrabSig.hitile",
                    "valueScaling": "log",
                    "lineStrokeWidth": 1,
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "labelTextOpacity": 0.4,
                    "showMousePosition": false,
                    "mousePositionColor": "#999999",
                    "showTooltip": false
                  },
                  "width": 479,
                  "height": 20,
                  "uid": "RzZlBf58Q7WanbmbZRv-lA"
                },
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
                  "server": "http://higlass.io/api/v1",
                  "tilesetUid": "F2vbUeqhS86XkxuO1j2rPA",
                  "type": "vertical-line",
                  "options": {
                    "labelColor": "red",
                    "labelPosition": "outerLeft",
                    "axisPositionHorizontal": "right",
                    "lineStrokeColor": "blue",
                    "name": "wgEncodeSydhTfbsGm12878Rad21IggrabSig.hitile",
                    "valueScaling": "log",
                    "axisPositionVertical": "top",
                    "lineStrokeWidth": 1,
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "labelTextOpacity": 0.4,
                    "showMousePosition": false,
                    "showTooltip": false,
                    "mousePositionColor": "#999999"
                  },
                  "width": 20,
                  "uid": "Y8NKUAFQR1SYGrYJMbEoeQ",
                  "height": 691
                },
                {
                  "type": "vertical-gene-annotations",
                  "width": 60,
                  "tilesetUid": "OHJakQICQD6gTD7skx4EWA",
                  "server": "http://higlass.io/api/v1",
                  "options": {
                    "labelPosition": "bottomRight",
                    "name": "Gene Annotations (hg19)",
                    "labelColor": "black",
                    "plusStrandColor": "blue",
                    "minusStrandColor": "red",
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "showMousePosition": false,
                    "mousePositionColor": "#999999"
                  },
                  "uid": "OgnAEKSHRaG-gR1RqPOuBQ",
                  "height": 691
                },
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
                  "type": "vertical-gene-annotations",
                  "width": 60,
                  "tilesetUid": "OHJakQICQD6gTD7skx4EWA",
                  "server": "http://higlass.io/api/v1",
                  "options": {
                    "labelPosition": "outerBottom",
                    "name": "Gene Annotations (hg19)",
                    "labelColor": "black",
                    "plusStrandColor": "blue",
                    "minusStrandColor": "red",
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "showMousePosition": false,
                    "mousePositionColor": "#999999"
                  },
                  "uid": "Fbw5wZb8Soe1JgQQ2Z6EoA",
                  "height": 691
                },
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
                {
                  "server": "http://higlass.io/api/v1",
                  "tilesetUid": "F2vbUeqhS86XkxuO1j2rPA",
                  "type": "horizontal-line",
                  "options": {
                    "labelPosition": "outerLeft",
                    "axisPositionHorizontal": "right",
                    "lineStrokeColor": "blue",
                    "name": "wgEncodeSydhTfbsGm12878Rad21IggrabSig.hitile",
                    "valueScaling": "log",
                    "labelColor": "black",
                    "lineStrokeWidth": 1,
                    "trackBorderWidth": 0,
                    "trackBorderColor": "black",
                    "labelTextOpacity": 0.4,
                    "showMousePosition": false,
                    "mousePositionColor": "#999999",
                    "showTooltip": false
                  },
                  "width": 479,
                  "height": 50,
                  "uid": "NlTkTBTCS--0qpB9Kn_ohw"
                }
              ],
              "whole": [
                {
                  "type": "cross-rule",
                  "x": 1103691812.8496904,
                  "y": 1338569560.9603324,
                  "options": {
                    
                  },
                  "uid": "btFjZjl2Tkm3hmjVhWBqTA",
                  "width": 20,
                  "height": 20
                }
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
              "visible": true,
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
    };

    this.hgView = React.createRef();
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {

    const hgViewOptions = { 
      bounded: true,
      pixelPreciseMarginPadding: false,
      containerPaddingX: 0,
      containerPaddingY: 0,
      viewMarginTop: 10,
      viewMarginBottom: 10,
      viewMarginLeft: 10,
      viewMarginRight: 10,
      viewPaddingTop: 0,
      viewPaddingBottom: 0,
      viewPaddingLeft: 0,
      viewPaddingRight: 0 
    };

    return (
      <div className="box">
        <div className="row header">
          <h4>hilbert-genome-cooler demo viewer</h4>
        </div>
        <div className="row content">
          <HiGlassComponent
            ref={(component) => this.hgView = component}
            options={hgViewOptions}
            viewConfig={this.state.hgViewconf}
            />
        </div>
        <div className="row footer" />
      </div>
    );
  }
}

export default App;