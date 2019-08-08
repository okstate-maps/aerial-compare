import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { cloneDeep } from 'lodash';
import RowContainer from './RowContainer';
import { findWithAttr, moveWithinArray } from './Util';

class MapsContainer extends Component {

  constructor(props) {
    super(props);
    //this.handleItemClick = this.handleItemClick.bind(this);
    //this.transmitGeocode = this.transmitGeocode.bind(this);
    //this.toggleFullscreen = this.toggleFullscreen.bind(this);
    //this.findWithAttr = this.findWithAttr.bind(this);
    //this.toggleLabels = this.toggleLabels.bind(this);
    //this.mapCenter = this.mapCenter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    //this.updateLayerDisplayIndexesAndRows = this.updateLayerDisplayIndexesAndRows.bind(this);
    //this.calculateDisplayIndexes = this.calculateDisplayIndexes.bind(this);
    //this.calculateRowLayers = this.calculateRowLayers.bind(this);
    //this.moveWithinArray = this.moveWithinArray.bind(this);
    this.state = {"layers":[],
                  "mapRefs": {},
                //  "rows":{ "row1":[], "row2":[]},
                  //"numberRows": ["row1"], //default to include one row so the no-maps message displays 
                  "numberOfLayersOn": 0}
   //               "geocodeResult": {},
   //               "labelLayerOn": true};

    this.passUpRef = this.passUpRef.bind(this);
  }

  passUpRef(id, ref, deleteRef) {
    let mapRefs = {"mapRefs": this.state.mapRefs};

    if (deleteRef) {
      this.unsyncMaps(id);
      //console.log("map unmounted: " + id);
      delete(mapRefs.mapRefs[id]);
      this.setState(mapRefs);
    }
    else {
      //console.log("map mounted: " + id);
      this.syncMaps();
    }
    this.invalidateMapSizes();
  }

  // moveWithinArray(array, from, to) {
  //   array.splice(to, 0, array.splice(from, 1)[0]);
  // }


  setMapRef(DOMNode) {
    //debugger;
   // console.log("setup mapRef");
    let mapRefs = {"mapRefs": this.state.mapRefs};

    //if (DOMNode && DOMNode.container !== null) {
    if (DOMNode) {
      mapRefs.mapRefs[DOMNode.container.id] = DOMNode;
      this.setState(mapRefs);
    }
  }

 onDragEnd(draggedLayer) {

    if (draggedLayer.destination === null) {
      return;
    }

    let allLayers = this.props.layers;
    let currentRow = draggedLayer.source.droppableId;  
    let destRow = draggedLayer.destination.droppableId;
    
    let layerId = draggedLayer.draggableId.replace("draggable-","");
    
    let currentLayerIndex;
    
    if (currentRow === "row2") {
      currentLayerIndex = allLayers.filter(i => i.row === "row1").length + draggedLayer.source.index;
    }
    else {
      currentLayerIndex = draggedLayer.source.index;
    }

    let destinationIndex;
    
    if (destRow === "row2") {
      destinationIndex = allLayers.filter(i => i.row === "row1").length + draggedLayer.destination.index;
    }
    else {
      destinationIndex = draggedLayer.destination.index;
    }

    console.log("Current Index: " + currentLayerIndex);
    console.log("Destination Index: " + destinationIndex);

    let allTurnedOnLayers = allLayers.filter(i => i.isToggledOn);
    moveWithinArray(allTurnedOnLayers, currentLayerIndex, destinationIndex);
 	this.props.updateLayerDisplayIndexesAndRows(allTurnedOnLayers);

    //let newState = this.splitLayersIntoRows(allTurnedOnLayers, this.state.numberOfLayersOn);

    //this.setState(
    //  {...newState, "layers": allLayers}, 
    //  () => {setTimeout(this.invalidateMapSizes, 400)} 
    //);


  }



  invalidateMapSizes() {
    //console.log("invalidateMapSizes");

    let mapRefs = this.state.mapRefs;
    for (let i in mapRefs){ 
      //console.log("invalidate "+ i)
      //console.log(mapRefs[i]);
      mapRefs[i].leafletElement.invalidateSize();
    }
  }

  unsyncMaps(ref_id) {
    //console.log("UNsync maps");
    let mapRefs = this.state.mapRefs;
    for (let i in mapRefs){
      if (i !== ref_id && mapRefs[ref_id]){
          mapRefs[ref_id].leafletElement.unsync(mapRefs[i].leafletElement);
          mapRefs[i].leafletElement.unsync(mapRefs[ref_id].leafletElement);
      }
    }
  }

  syncMaps() {

    // console.log("sync maps");
    let mapRefs = this.state.mapRefs;
    //debugger;
    //console.log("Number of mapRefs: " + Object.values(mapRefs).length);
    for (let i in mapRefs){
      for (let j in mapRefs){
         //debugger;
         if (i !== j && !mapRefs[i].leafletElement.isSynced(mapRefs[j].leafletElement)){

           //console.log("sync " + i + " with " + j);
           mapRefs[i].leafletElement.sync(mapRefs[j].leafletElement, {syncCursor: true});           
          }
      }
   }
  }



  componentDidUpdate(prevProps, prevState){
    //console.log("App componentDidUpdate");
    

    if (prevProps.layers.filter(i => i.isToggledOn).length !== 
         this.props.layers.filter(i => i.isToggledOn).length) {

      this.invalidateMapSizes();
    }

    if (prevProps.geocode !== this.props.geocode) {
      let randomMap = Object.entries(this.state.mapRefs)[0][1];
      let bbox = this.props.geocode.geocode.bbox;
      randomMap.leafletElement.fitBounds(bbox);
    }

  }


  render() {
  	let layers = this.props.layers.filter(lyr => lyr.isToggledOn);
  	let numberRows = [];
    layers.forEach(lyr => {
    	numberRows.push(lyr.row);
    });
    numberRows = new Set(numberRows);
    numberRows = [...numberRows];

    let row1Layers = layers.filter(i => i.row === "row1");
    row1Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    let row2Layers = layers.filter(i => i.row === "row2");
    row2Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    

    let rows = numberRows.map( (val, index) => { 
      return (
        <Droppable droppableId={val} key={val} direction="horizontal">
          {(provided, snapshot) => (
            <RowContainer className={"Row " + val + (numberRows.length === 2 ? " two-rows" : "" )} 
                  provided={provided}
                  snapshot={snapshot}
                  passUpRef={this.passUpRef}
				  geocodeResult={this.state.geocode}
                  mapRef={this.setMapRef} 
                  innerRef={provided.innerRef}
                  syncMaps={this.syncMaps}
                  unsyncMaps={this.unsyncMaps}
                  invalidateMapSizes={this.invalidateMapSizes}
                  layers={val === "row1" ? row1Layers : row2Layers}>

                {/*
              <MapView layers={this.state.rows[val]}
                       row={val}
                       geocodeResult={this.state.geocode}
                       mapCenter={this.mapCenter}
                       labelLayerOn={this.state.labelLayerOn}
                       key={"mapview" + val}
                       provided={provided}
                       passUpRef={this.passUpRef}
                       syncMaps={this.syncMaps}
                       unsyncMaps={this.unsyncMaps}
                       invalidateMapSizes={this.invalidateMapSizes}
                       mapRef={this.setMapRef}
              >
                </MapView>
            */}
            </RowContainer>
          )}  
        </Droppable>
      )
    });

    //const { provided, innerRef, children, rows } = this.props;
    return (
      <div id='maps'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {rows}
            </DragDropContext>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <MapsContainer mapRef={ref} {...props} />);;
