import React, { Component } from 'react';
import {Map, TileLayer, WMSTileLayer} from 'react-leaflet';
//import Control from 'react-leaflet-control';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import Config from './Config';
import 'leaflet.sync';
import './MapView.css';

//const { Map, TileLayer, Marker, Popup } = ReactLeaflet

class Handle extends React.Component {
  render() {
    const { provided, innerRef, children, display_name } = this.props;
    return (
      <div {...provided.dragHandleProps}
         className={display_name>= 40 ? "map-title long-title" : "map-title"}>
         {display_name}
      </div>
    );
  }
}


class MapWrapper extends Component {
  
  constructor(props, context) {
    super(props)
    this.mapboxToken = Config.mapboxToken;
    this.labelLayerUrl = Config.labelLayerUrl + this.mapboxToken;

    const DEFAULT_VIEWPORT = {
      center: [36.1156, -97.0584],
      zoom: 13
    }
    this.viewport = DEFAULT_VIEWPORT;
    //this.props.mapCenter(this.viewport.center);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.moveend = this.moveend.bind(this);
    this.onViewportChanged = this.onViewportChanged.bind(this);
  }

  moveend(e) {

  }

  invalidateMapSizes() {
    for (var i in this.refs){
      this.refs[i].leafletElement.invalidateSize();
    }
  }
  
  componentWillMount() {
    //console.log("MapView WillMount");
  }  

  componentWillUnmount() {
    //console.log("MapView WillUnmount");
  }

  componentWillReceiveProps(nextProps) {
    for (let i in nextProps.layers){
      let id = nextProps.layers[i].id;
      if (this.refs[id] && !nextProps.layers[i].isToggledOn){
        this.unsyncMaps(id);
      }
    }
  }

  unsyncMaps(ref_id) {
    for (let i in this.refs){
      if (i !== ref_id && this.refs[ref_id]){
        this.refs[ref_id].leafletElement.unsync(this.refs[i].leafletElement);
        this.refs[i].leafletElement.unsync(this.refs[ref_id].leafletElement);
      }
    }
  }

  syncMaps() {
    for (let i in this.refs){
      for (let j in this.refs){
        if (i !== j){
          if (this.refs[i] && !this.refs[i].leafletElement.isSynced(this.refs[j].leafletElement)){
            this.refs[i].leafletElement.sync(this.refs[j].leafletElement, {syncCursor: true});           
          }
        }
      }
    }
  }

  componentWillUpdate(){
    //console.log("MapView WillUpdate");
  }

  componentDidUpdate(prevProps, prevState){
    //console.log("MapView DidUpdate");

    if (prevProps.geocodeResult !== this.props.geocodeResult) {
      let randomMap = Object.entries(this.refs)[0][1];
      let bbox = this.props.geocodeResult.geocode.bbox;
      randomMap.leafletElement.fitBounds(bbox);
    }
    this.syncMaps();
    this.invalidateMapSizes();
  }

  componentDidMount(prevProps, prevState){
    //console.log("MapView DidMount");
    this.invalidateMapSizes();
  }

  onViewportChanged(viewport) { 
    // The viewport got changed by the user, keep track in state
    //console.log("viewport changed");

    //putting viewport into state results in (near) infinite loop of componentdidupdates
    //probably because L.sync is not react-ified
    //so just use good ole generic this.viewport instead
    this.viewport = viewport;
    //this.props.mapCenter(viewport.center);
  }

  render() {
    const layer_components = {
      "EsriTiledMapLayer": EsriTiledMapLayer,
      "WMSTileLayer": WMSTileLayer,
      "TileLayer": TileLayer
    }

    const placeholder = this.props.placeholder;
    const layer = this.props.layer;
    let that = this;
    let Layer = layer_components[layer.type];
    const { provided, innerRef } = this.props;
  

    // Use ids from layers array to create list of urls
    return (    <div 
                      {...provided.draggableProps}
                    
                      ref={innerRef}
                      >
                    <Handle provided={provided} display_name={layer.display_name} />
                    <Map ref={layer.id} 
                     minZoom={11}
                     maxZoom={layer.maxZoom}
                     onViewportChanged={that.onViewportChanged}
                     className ={'map'+ this.props.numberLayers + ' p' + this.props.layerIndex + " " + (this.props.isDragging ? "dragging": "nope")}  
                    
                     key={layer.id} 
                     viewport={that.viewport}
                    >
                    
                     
                      <TileLayer url={this.labelLayerUrl}
                        opacity={this.props.labelLayerOn ? 100 : 0}
                        zIndex={10000} />
                     
                      <Layer 
                        key={layer.id} 
                        url={layer.url}
                        layers={layer.layers}
                        maxZoom={layer.maxZoom}
                        opacity={layer.opacity} />

                    </Map>
                    {placeholder}
                  </div>
              )
  }
}  


export default MapWrapper;
