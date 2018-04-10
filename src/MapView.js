import React, { Component } from 'react';
import Control from 'react-leaflet-control';
import {Map, TileLayer, WMSTileLayer} from 'react-leaflet';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import 'leaflet.sync';
import './MapView.css';

//const { Map, TileLayer, Marker, Popup } = ReactLeaflet

class MapView extends Component {
  
  constructor(props, context) {
    super(props)
    this.mapboxToken = "pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg";

    const DEFAULT_VIEWPORT = {
      center: [36.1156, -97.0584],
      zoom: 13
    }
    this.viewport = DEFAULT_VIEWPORT;
    this.syncMaps = this.syncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
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
    console.log("MapView WillUpdate");
  }

  componentDidUpdate(prevProps, prevState){
    console.log("MapView DidUpdate");

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
  }

  render() {

    // Use ids from layers array to create list of urls
    const layers = this.props.layers;
    const layer_components = {
      "EsriTiledMapLayer": EsriTiledMapLayer,
      "WMSTileLayer": WMSTileLayer,
      "TileLayer": TileLayer
    }
    const that = this;
    const labelLayerUrl = 'https://api.mapbox.com/styles/v1/krdyke/cjf9wgvwg0zlh2rmo4jx9jcec/tiles/256/{z}/{x}/{y}?access_token=' + this.mapboxToken;
    var filtered_layers = layers.filter(lyr => {
      if (lyr.isToggledOn){
        return true;
      }
      else {
        return false;
      }
    });

    if (filtered_layers.length === 0){

      return (<div className='no-maps'>
                 <p>Welcome to Stillwater from the Air!</p>
                 <p>
                  With this website you can see how Stillwater and Oklahoma State University 
                  have changed over the years.
                 </p>
                 <p>
                  To get started, click or tap on one of the years at the bottom of the screen. You
                  can select up to 8 at a time.
                  </p>
               </div>
              );
    }

    else if (filtered_layers.length >= 1){
      
      let maps = filtered_layers.map( (layer, index) => {
          
          let Layer = layer_components[layer.type];

          return <Map ref={layer.id} 
                   minZoom={11}
                   maxZoom={18}
                   onViewportChanged={that.onViewportChanged}
                   className ={'map'+ filtered_layers.length + ' p' + index}  
                   key={layer.id} 
                   viewport={that.viewport}>
                    <TileLayer url={labelLayerUrl}
                      zIndex={10000} />
                    <Layer 
                        key={layer.id} 
                        url={layer.url}
                        opacity={layer.opacity} />
                    <Control position="topright">
                      <div className={layer.display_name.length >= 40 ? "map-title long-title" : "map-title"}>{layer.display_name}</div>
                    </Control>
                </Map>
          });
        return maps;
      
    }
  }
}

export default MapView;
