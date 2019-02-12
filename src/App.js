import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import Fullscreen from 'react-fullscreen-crossbrowser';
import UtilityBar from './UtilityBar';
import MapView from './MapView';
import ViewBar from './ViewBar';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);
    this.mapCenter = this.mapCenter.bind(this);
    this.state = {"layers":[], 
                  "numberOfLayersOn": 0, 
                  "geocodeResult": {}, 
                  "labelLayerOn": true};

    //alert alert hack ahead
    window.vex = Vex;
    window.vex.registerPlugin(plugin);
    window.vex.defaultOptions.className = 'vex-theme-os';
  }

  transmitGeocode(geocode) {
    this.setState({"geocode": geocode});
  }

  toggleFullscreen() {
    let current_val = this.state.isFullscreenEnabled;
    this.setState({isFullscreenEnabled: !current_val});
  }

  toggleLabels() {
    console.log("toggleLabels");
    let curr = this.state.labelLayerOn;
    this.setState({"labelLayerOn": !curr});
  }


  mapCenter(center){
    this.setState({"mapCenter": center});
  }

  handleItemClick(data) {
    let found = false;
    let newState = {};

    this.state.layers.forEach((lyr, index) => {
      if (data.id === lyr.id){
        found = [true,index];
      }
    });

    if (!found){
        newState.layers = [...this.state.layers, data];
    }

    else {
      newState = this.state;
      newState.layers[found[1]] = data;

      //rearrange the layers array so display order matches clicked order
      newState.layers.splice(newState.layers.length - 1,
       0, newState.layers.splice(found[1], 1)[0]
      );
      
    }

      newState.numberOfLayersOn = newState.layers.filter(i => i.isToggledOn).length;
      this.setState(newState);
  }

  render() {
   
    return (

      <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}>

        <div className="App">
        
          <header className="App-header">
            Stillwater from the Air
          </header>

          <div id='maps'>
            <MapView layers={this.state.layers}
                     geocodeResult={this.state.geocode}
                     mapCenter={this.mapCenter}
                     labelLayerOn={this.state.labelLayerOn} />  
          </div>

          {this.state.numberOfLayersOn > 0 && 
            <UtilityBar transmitGeocode={this.transmitGeocode} 
                        toggleFullscreen={this.toggleFullscreen}
                        toggleLabels={this.toggleLabels}
                        labelLayerOn={this.state.labelLayerOn}
                        isFullscreenEnabled={this.state.isFullscreenEnabled} />
          }

          <ViewBar onItemClick={this.handleItemClick}
                   numberOfLayersOn={this.state.numberOfLayersOn} />

        </div>
      </Fullscreen>
    );
  }
}

export default App;
