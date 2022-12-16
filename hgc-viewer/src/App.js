import React, { Component } from "react";

// higlass
// cf. https://www.npmjs.com/package/higlass
import "higlass/dist/hglib.css";
import { HiGlassComponent } from "higlass";

import * as Constants from "./Constants.js";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hgViewKey: 0,
      demoHgViewOptions: Constants.demoHgViewOptions,
      demoHgViewconf: Constants.demoHgViewconf,
      demoDatasetMd: Constants.demoDatasetMd,
    };

    this.hgView = React.createRef();
  }

  componentDidMount() {}
  
  componentWillUnmount() {}

  render() {
    return (
      <div className="box">
        <div className="row header">
          <div>
            <span className="title">hilbert-genome-cooler demo viewer</span> <span className="subtitle">{this.state.demoDatasetMd.filename}</span>
          </div>
        </div>
        <div className="row content">
          <HiGlassComponent
            ref={(component) => this.hgView = component}
            options={this.state.demoHgViewOptions}
            viewConfig={this.state.demoHgViewconf}
            />
        </div>
        <div className="row footer" />
      </div>
    );
  }
}

export default App;
