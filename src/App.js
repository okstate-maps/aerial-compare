import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import Geocoder from './Geocoder';
import MapView from './MapView';
import ViewBar from './ViewBar';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.mapCenter = this.mapCenter.bind(this);
    this.state = {"layers":[], "numberOfLayersOn": 0, "geocodeResult": {}};
    //alert alert hack ahead
    window.vex = Vex;
    window.vex.registerPlugin(plugin);
    window.vex.defaultOptions.className = 'vex-theme-os';
  }

  transmitGeocode(geocode) {
    this.setState({"geocode": geocode});
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
      <div className="App">
        <header className="App-header">
          Stillwater from the Air
        </header>
        <div id='maps'>
          <MapView layers={this.state.layers}
                   geocodeResult={this.state.geocode}
                   mapCenter={this.mapCenter}/>  
        </div>
        {this.state.numberOfLayersOn > 0 && <Geocoder transmitGeocode={this.transmitGeocode} />}
        <ViewBar onItemClick={this.handleItemClick}
                 numberOfLayersOn={this.state.numberOfLayersOn} />
      </div>
    );
  }
}

export default App;
