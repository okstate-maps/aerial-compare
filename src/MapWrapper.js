import React, { Component } from 'react';
import {Map, TileLayer, WMSTileLayer} from 'react-leaflet';
//import Control from 'react-leaflet-control';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import Config from './Config';
import 'leaflet.sync';
import './MapView.css';

//const { Map, TileLayer, Marker, Popup } = ReactLeaflet

class Handle extends React.Component {
  render() {
    const { provided, display_name } = this.props;
    return (
      <div {...provided.dragHandleProps}
         className={display_name.length >= 40 ? "map-title long-title" : "map-title"}>
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
    this.passUpRef = this.passUpRef.bind(this);
  }

  moveend(e) {

  }
  
  invalidateMapSizes() {
    this.props.invalidateMapSizes();
  }
  
  componentWillMount() {
    //console.log("MapView WillMount");
  }  

componentWillUnmount(){
  console.log("MapWrapper will unmount:  "+ this.props.layer.id);
  this.passUpRef(this.props.layer.id, this.props.mapRef, true);

}

  componentWillReceiveProps(nextProps) {

    //console.log("you dumb fuck");

    // for (let i in nextProps.layers){
    //   let id = nextProps.layers[i].id;
    //   if (this.refs[id] && !nextProps.layers[i].isToggledOn){
    //     this.unsyncMaps(id);
    //   }
    // }
  }

  unsyncMaps(ref_id) {
     this.props.unsyncMaps(ref_id);
  }

  syncMaps() {
    this.props.syncMaps();
  }

  //componentDidUpdate(prevProps, prevState){
  
  //}

  passUpRef(id, ref, deleteRef=false) {
    //console.log("MapWrapper.js: " +id);
    this.props.passUpRef(id, ref, deleteRef);
  }



  componentDidMount(prevProps, prevState){
    console.log("MapWrapper DidMount: " + this.props.layer.id);
    //debugger;
    this.passUpRef(this.props.layer.id, this.props.mapRef);
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
                    <Map ref={this.props.mapRef}
                     minZoom={11}
                     maxZoom={layer.maxZoom}
                     onViewportChanged={that.onViewportChanged}
                     className ={'map'+ this.props.numberLayers + ' p' + this.props.layerIndex + " " + (this.props.isDragging ? "dragging": "nope")}  
                     id={layer.id}
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
                  </div>
              )
  }
}  


export default React.forwardRef((props, ref) => <MapWrapper mapRef={ref} {...props} />);

