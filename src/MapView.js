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
    this.arcgis_service_url = 'https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/{{id}}/MapServer';
    const DEFAULT_VIEWPORT = {
      center: [36.1156, -97.0584],
      zoom: 13
    }
    this.viewport = DEFAULT_VIEWPORT;
    this.syncMaps = this.syncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.moveend = this.moveend.bind(this);
    this.diff = this.diff.bind(this);
    this.onViewportChanged = this.onViewportChanged.bind(this);
  }

  moveend(e) {
    //var new_center = e.target.getCenter();
    //new_center["zoom"] = e.target.getZoom();
    //this.setState(new_center);
  }

  invalidateMapSizes() {
    for (var i in this.refs){
      this.refs[i].leafletElement.invalidateSize();
    }
  }
  
  componentWillMount() {
    console.log("componentWillMount");
    //this.unsyncMaps(this.leafletElement);
  }  

  componentWillUnmount() {
    console.log("componentWillUnmount");
    //this.unsyncMaps(this.leafletElement);
  }

  diff(a, b) {
    return a.filter(function(i) {return b.indexOf(i) < 0;})
  }

  componentWillReceiveProps(nextProps) {
    var id;
    for (var i in nextProps.layers){
      id = nextProps.layers[i].id;
      if (this.refs[id] && !nextProps.layers[i].isToggledOn){
        this.unsyncMaps(id);
      }
    }
  }

  unsyncMaps(ref_id) {
    console.log("unsyncMaps");
    for (var i in this.refs){
      if (i !== ref_id && this.refs[ref_id]){
        this.refs[ref_id].leafletElement.unsync(this.refs[i].leafletElement);
        this.refs[i].leafletElement.unsync(this.refs[ref_id].leafletElement);
      }
    }
  }

  syncMaps() {
    for (var i in this.refs){
      for (var j in this.refs){
        if (i !== j){
          if (this.refs[i] && !this.refs[i].leafletElement.isSynced(this.refs[j].leafletElement)){
            //this.refs[i].leafletElement.setView(this.state.viewport.center, this.state.viewport.zoom)
            console.log("do some syncing");
            this.refs[i].leafletElement.sync(this.refs[j].leafletElement, {syncCursor: true});           
          }
        }
      }
    }
  }

  componentWillUpdate(){
    console.log("componentWillUpdate");

  }

  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate");
    this.syncMaps();
    this.invalidateMapSizes();
  }

  componentDidMount(prevProps, prevState){
    console.log("componentDidMount");
    this.invalidateMapSizes();
  }

  onViewportChanged(viewport) { 
    // The viewport got changed by the user, keep track in state
    console.log("viewport changed");

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
    var filtered_layers = layers.filter(function(lyr){
      if (lyr.isToggledOn){
        return true;
      }
      else {
        return false;
      }
    })

    if (filtered_layers.length === 0){

      return (
        
          <Map onViewportChanged={that.onViewportChanged} ref='map0' className='map0' viewport={that.viewport}>
           {/*<TileLayer
                  attribution='&copy; <a href="http://mapbox.com">Mapbox</a>'
                  url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg'
                />*/}
            <WMSTileLayer
              url="https://gis.apfo.usda.gov/arcgis/services/NAIP/Oklahoma/ImageServer/WMSServer"
              layers="0"
              attribution="<a href='https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/Oklahoma/ImageServer'>NAIP</a>"
            />           
          </Map>

      );
    }

    else if (filtered_layers.length >= 1){
      
      return filtered_layers.map(function(layer, index) {
          let Layer = layer_components[layer.type];
          return <Map ref={layer.id} 
                 onViewportChanged={that.onViewportChanged}
                 className ={'map'+ filtered_layers.length + ' p' + index}  
                 key={layer.id} 
                viewport={that.viewport}>
              <Layer 
                  key={layer.id} 
                  url={layer.url}
                  opacity={layer.opacity} />
              <Control position="topright">
                <span className="map-title">{layer.display_name}</span>
              </Control>
            </Map>
          })
        
      
    }
  }
}

export default MapView;
