import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import UtilityBar from './UtilityBar';
import MapView from './MapView';
import ViewBar from './ViewBar';
import './App.css';


Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

class List extends React.Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div className={this.props.className} {...provided.droppableProps} ref={innerRef}>
        {children}
        {provided.placeholder}
      </div>
    );
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.findWithAttr = this.findWithAttr.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);
    this.mapCenter = this.mapCenter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.state = {"layers":[],
                  "rows":{ "row1":[], "row2":[]},
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
    console.log("toggleLabels");
    let curr = this.state.labelLayerOn;
    this.setState({"labelLayerOn": !curr});
  }


  mapCenter(center){
    this.setState({"mapCenter": center});
  }



  onDragEnd(draggedLayer) {
    console.log(draggedLayer);
    let allLayers = cloneDeep(this.state.layers);
    let newStateLayers = cloneDeep(this.state.rows);
    
    let sourceRow = draggedLayer.source.droppableId;
    let destRow = draggedLayer.destination.droppableId;
    
    let layerId = draggedLayer.draggableId.replace("draggable-","");

    let currentLayerIndex = this.findWithAttr(this.state.layers, "id", layerId);
    let destinationIndex;
    if (destRow === "row2") {
      destinationIndex = this.state.rows["row1"].length + draggedLayer.destination.index;
    }

    else {
      destinationIndex = draggedLayer.destination.index;
    }

    console.log("Current Index: " + currentLayerIndex);
    console.log("Destination Index: " + destinationIndex);

/*
    if (destRow !== sourceRow) {
      console.log("Dragged layer changed row! wowweee");
      newStateLayers[destRow] = [...newStateLayers[destRow], newStateLayers[sourceRow][currentLayerIndex]];
      newStateLayers[sourceRow].splice(currentLayerIndex, 1);
    }*/

    allLayers.move(currentLayerIndex, destinationIndex);
    let allTurnedOnLayers = cloneDeep(allLayers.filter(i => i.isToggledOn));
    let newState = this.splitLayersIntoRows(allTurnedOnLayers, this.state.numberOfLayersOn);

    this.setState({...newState, "layers": allLayers});
  }

  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
  componentDidUpdate(prevProps, prevState){
    //console.log("hi");
  }

  handleItemClick(data) {
    let found = false;
    let newStateLayers = cloneDeep(this.state.layers);
    

    newStateLayers.forEach((lyr, index) => {
      if (data.id === lyr.id){
        found = [true,index];
      }
    });

    if (!found){
        newStateLayers = newStateLayers.concat([data]);
    }

    else {

      newStateLayers[found[1]].isToggledOn = !this.state.layers[found[1]].isToggledOn;

      //rearrange the layers array so display order matches clicked order
      newStateLayers.move(found[1], newStateLayers.length - 1);
      
    }

    let newNumberOfLayersOn = newStateLayers.filter(i => i.isToggledOn).length;
    let rowState = this.splitLayersIntoRows(cloneDeep(newStateLayers.filter(i => i.isToggledOn)), newNumberOfLayersOn);
    let newState = {...rowState, "layers": newStateLayers,
                  "numberOfLayersOn": newNumberOfLayersOn};

    this.setState(newState);
  }

 
 splitLayersIntoRows(layers, numberOfLayersOn) {
    let numberRows;
    let newState = {rows: {}};
    let rowOneLayers;
    let rowTwoLayers;
    let allLayers = layers;
    
    if (numberOfLayersOn >= 4){
      numberRows = ["row1","row2"];
      switch(numberOfLayersOn){
          case 4:
            rowOneLayers = allLayers.splice(0,2)
            break;
          case 5:
          case 6:
            rowOneLayers = allLayers.splice(0,3)
            break;
          case 7:
          case 8:
            rowOneLayers = allLayers.splice(0,4)
            break;
          default:
            break;
      }
      console.log("ALLLAYERS")
      console.log(allLayers);
      rowTwoLayers = allLayers; //row two gets the remainder
      newState.rows["row2"] = rowTwoLayers;
    }

    else {
      rowOneLayers = allLayers;
      numberRows = ["row1"];
    }
    newState.numberRows = numberRows;
    newState.rows["row1"] = rowOneLayers;
    return newState;
  }


  render() {
    const numberRows = this.state.numberRows;

    let rows = numberRows.map( (val, index) => { 
      return (
        <Droppable droppableId={val} key={val} direction="horizontal">
          {provided => (
            <List className={"List " + val + (numberRows.length === 2 ? " two-rows" : "" )} 
                  provided={provided} 
                  innerRef={provided.innerRef}>

              <MapView layers={this.state.rows[val]}
                       row={val}
                       geocodeResult={this.state.geocode}
                       mapCenter={this.mapCenter}
                       labelLayerOn={this.state.labelLayerOn}
                       key={"mapview" + val}
                       provided={provided}
              >
                </MapView>
            </List>
          )}  
        </Droppable>
      )
    });
//    console.log(rows);

    return (

      <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}>

        <div className="App">
        
          <header className="App-header">
            Stillwater from the Air
          </header>

          <div id='maps'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {rows}
            </DragDropContext>
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
