import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import { findWithAttr, moveWithinArray } from './Util';
import UtilityBar from './UtilityBar';
//import MapView from './MapView';
import ViewBar from './ViewBar';
import MapsContainer from './MapsContainer';
//import RowContainer from './RowContainer';
import './App.css';



class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);
    this.mapCenter = this.mapCenter.bind(this);
    //this.onDragEnd = this.onDragEnd.bind(this);
    //this.setMapRef = this.setMapRef.bind(this);
    //this.syncMaps = this.syncMaps.bind(this);
    //this.unsyncMaps = this.unsyncMaps.bind(this);
    //this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    this.calculateDisplayIndexes = this.calculateDisplayIndexes.bind(this);
    this.calculateRowLayers = this.calculateRowLayers.bind(this);
    this.updateLayerDisplayIndexesAndRows = this.updateLayerDisplayIndexesAndRows.bind(this);
    //this.findWithAttr = this.findWithAttr.bind(this);
    //this.moveWithinArray = this.moveWithinArray.bind(this);
    //this.passUpRef = this.passUpRef.bind(this);
    this.state = {"layers":[],
                  //"mapRefs": {},
                  //"rows":{ "row1":[], "row2":[]},
                  "numberRows": ["row1"], //default to include one row so the no-maps message displays 
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


  mapCenter(center){
    this.setState({"mapCenter": center});
  }

  // onDragEnd(draggedLayer) {

  //   if (draggedLayer.destination === null) {
  //     return;
  //   }

  //   let allLayers = cloneDeep(this.state.layers);
  //   let currentRow = draggedLayer.source.droppableId;  
  //   let destRow = draggedLayer.destination.droppableId;
    
  //   let layerId = draggedLayer.draggableId.replace("draggable-","");
    
  //   let currentLayerIndex;
  //   if (currentRow === "row2") {
  //     currentLayerIndex = this.state.rows["row1"].length + draggedLayer.source.index;
  //   }
  //   else {
  //     currentLayerIndex = draggedLayer.source.index;
  //   }

  //   let destinationIndex;
    
  //   if (destRow === "row2") {
  //     destinationIndex = this.state.rows["row1"].length + draggedLayer.destination.index;
  //   }
  //   else {
  //     destinationIndex = draggedLayer.destination.index;
  //   }

  //   console.log("Current Index: " + currentLayerIndex);
  //   console.log("Destination Index: " + destinationIndex);

  //   let allTurnedOnLayers = allLayers.filter(i => i.isToggledOn);
  //   console.log(allTurnedOnLayers[0].id);
  //   moveWithinArray(allTurnedOnLayers, currentLayerIndex, destinationIndex);
  //   console.log(allTurnedOnLayers[0].id);
  //   let newState = this.splitLayersIntoRows(allTurnedOnLayers, this.state.numberOfLayersOn);

  //   this.setState(
  //     {...newState, "layers": allLayers}, 
  //     () => {setTimeout(this.invalidateMapSizes, 400)} 
  //   );


  // }

  // findWithAttr(array, attr, value) {
  //   for(var i = 0; i < array.length; i += 1) {
  //       if(array[i][attr] === value) {
  //           return i;
  //       }
  //   }
  //   return -1;
  // }


  // componentDidUpdate(prevProps, prevState){
  //   //console.log("App componentDidUpdate");
    
  //   if (prevState.layers.filter(i => i.isToggledOn).length !== 
  //        this.state.layers.filter(i => i.isToggledOn).length) {

  //     this.invalidateMapSizes();
  //   }

  //   if (prevState.geocode !== this.state.geocode) {
  //     let randomMap = Object.entries(this.state.mapRefs)[0][1];
  //     let bbox = this.state.geocode.geocode.bbox;
  //     randomMap.leafletElement.fitBounds(bbox);
  //   }

  // }

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
    // let rowState = this.splitLayersIntoRows(
      // cloneDeep(newStateLayers.filter(i => i.isToggledOn)), 
      // newNumberOfLayersOn
    // );
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
  this.calculateRowLayers(newLayers)
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
  return layers;
}

 // splitLayersIntoRows(layers, numberOfLayersOn) {
 //    let numberRows;
 //    let newState = {rows: {}};
 //    let rowOneLayers;
 //    let rowTwoLayers;
 //    let allLayers = layers;

    
 //    if (numberOfLayersOn >= 4){
 //      numberRows = ["row1","row2"];
 //      switch(numberOfLayersOn){
 //          case 4:
 //            rowOneLayers = allLayers.splice(0,2)
 //            break;
 //          case 5:
 //          case 6:
 //            rowOneLayers = allLayers.splice(0,3)
 //            break;
 //          case 7:
 //          case 8:
 //            rowOneLayers = allLayers.splice(0,4)
 //            break;
 //          default:
 //            break;
 //      }
 //      //console.log("ALLLAYERS")
 //      //console.log(allLayers);
 //      rowTwoLayers = allLayers; //row two gets the remainder
 //      newState.rows["row2"] = rowTwoLayers;
 //    }

 //    else {
 //      rowOneLayers = allLayers;
 //      numberRows = ["row1"];
 //    }
 //    newState.numberRows = numberRows;
 //    newState.rows["row1"] = rowOneLayers;
 //    return newState;
 //  }


  render() {

    return (

      <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}>

        <div className="App">
        
          <header className="App-header">
            Stillwater from the Air
          </header>

          {/*
          <div id='maps'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {rows}
            </DragDropContext>
          </div>
          */}
          
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
