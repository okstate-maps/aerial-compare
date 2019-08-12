import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { findWithAttr, moveWithinArray } from './Util';
import UtilityBar from './UtilityBar';
import ViewBar from './ViewBar';
import MapsContainer from './MapsContainer';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);
    this.calculateDisplayIndexes = this.calculateDisplayIndexes.bind(this);
    this.calculateRowLayers = this.calculateRowLayers.bind(this);
    this.updateLayerDisplayIndexesAndRows = this.updateLayerDisplayIndexesAndRows.bind(this);
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
    //console.log("toggleLabels");
    let curr = this.state.labelLayerOn;
    this.setState({"labelLayerOn": !curr});
  }

  handleItemClick(data) {
    let found = false;
    let foundIdx;
    let newStateLayers = cloneDeep(this.state.layers);  

    newStateLayers.forEach((lyr, index) => {
      if (data.id === lyr.id){
        found = true;
        foundIdx = index;
      }
    });

    if (!found){
      newStateLayers = newStateLayers.concat([data]);
    }

    else {

      newStateLayers[foundIdx].isToggledOn = !this.state.layers[foundIdx].isToggledOn;

      //rearrange the layers array so display order matches clicked order
      moveWithinArray(newStateLayers, foundIdx, newStateLayers.length - 1);
    }

    newStateLayers = this.calculateDisplayIndexes(newStateLayers);
    newStateLayers = this.calculateRowLayers(newStateLayers);

    let newNumberOfLayersOn = newStateLayers.filter(i => i.isToggledOn).length;

    let newState = {"layers": newStateLayers,
                  "numberOfLayersOn": newNumberOfLayersOn};

    this.setState(newState);
  }

 updateLayerDisplayIndexesAndRows(layers) {
  let newLayers = cloneDeep(this.state.layers);
  layers.forEach((lyr, index) => {
    var lyrIndex = findWithAttr(newLayers, "id", lyr.id);
    newLayers[lyrIndex].visibleIndex = index;
  });
  newLayers = this.calculateRowLayers(newLayers);

  this.setState({"layers": newLayers},
    () => {setTimeout(this.invalidateMapSizes, 400)}
  );
 }

 calculateDisplayIndexes(layers) {
    var visibleIndex = 0;
    let newLayers = layers.map(function(lyr){
      if (lyr.isToggledOn) {
        lyr.visibleIndex = visibleIndex;
        visibleIndex ++;
      }

      return lyr;
    });
    return newLayers;
  }
  
calculateRowLayers(layers) {
  let visibleLayers = layers.filter(i => i.isToggledOn);
  let numberOfLayersOn = visibleLayers.length;
  visibleLayers.sort(function(a,b){
    return a.visibleIndex - b.visibleIndex;
  })

  switch(numberOfLayersOn){
    case 1:
    case 2:
    case 3:
      visibleLayers.forEach(i => i.row = "row1");
      break;
    case 4:
      visibleLayers.slice(0,2).forEach(i => i.row = "row1");
      visibleLayers.slice(2).forEach(i => i.row = "row2");
      break;
    case 5:
    case 6:
      visibleLayers.slice(0,3).forEach(i => i.row = "row1");
      visibleLayers.slice(3).forEach(i => i.row = "row2");
      break;
    case 7:
    case 8:
      visibleLayers.slice(0,4).forEach(i => i.row = "row1");
      visibleLayers.slice(4).forEach(i => i.row = "row2");
      break;
    default:
      break;
  }
  return visibleLayers;
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
         
          {this.state.numberOfLayersOn === 0 && 
            <div className='no-maps'>
               <p>Welcome to Stillwater from the Air!</p>
               <p>
                With this website you can see how Stillwater and Oklahoma State University 
                have changed over the years.
               </p>
               <p>
                Click or tap on one of the years at the bottom of the screen. You
                can select up to 8 at a time. Click or tap it again to turn it off.
                </p>
             </div>
          }

          {this.state.numberOfLayersOn > 0 && 
            <MapsContainer layers={this.state.layers} 
                           mapCenter={this.mapCenter}
                           geocodeResult={this.state.geocode}
                           labelLayerOn={this.state.labelLayerOn}
                           updateLayerDisplayIndexesAndRows={this.updateLayerDisplayIndexesAndRows}
                           >
        
            </MapsContainer>
          }

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
