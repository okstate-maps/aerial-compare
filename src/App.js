import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
    let layerId = draggedLayer.draggableId.replace("draggable-","");
    console.log("dragged layer is: " + layerId);
    let currentLayerIndex = this.findWithAttr(this.state.layers, "id", layerId);
    console.log("current index of layer is: " + currentLayerIndex);
    let newStateLayers = {"layers": this.state.layers};
    console.log("new index is: " + draggedLayer.destination.index);
    newStateLayers["layers"].move(currentLayerIndex,draggedLayer.destination.index);
    this.setState(newStateLayers);
  }

  findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
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
    let numberRows;
    let rowOneLayers;
    let rowTwoLayers;
    let allLayers = this.state.layers;
    const droppableId = "droppable"; 
    const numberOfLayersOn = this.state.numberOfLayersOn;
    
    if (numberOfLayersOn >= 4){
      numberRows = [1,2];
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
      rowTwoLayers = allLayers; //row two gets the remainder

    }

    else {
      rowOneLayers = allLayers;
      numberRows = [1];
    }

    let rows = numberRows.map( (val, index) => { 
      return (
        <Droppable droppableId={droppableId + val} key={droppableId + val}>
          {provided => (
            <List className={"List row" + val + (numberRows.length === 2 ? " two-rows" : "" )} 
                  provided={provided} 
                  innerRef={provided.innerRef}>

              <MapView layers={val === 1 ? rowOneLayers : rowTwoLayers}
                       geocodeResult={this.state.geocode}
                       mapCenter={this.mapCenter}
                       labelLayerOn={this.state.labelLayerOn}
                       key={"mapview" + val}
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
