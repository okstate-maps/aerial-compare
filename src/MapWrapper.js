import React, { Component } from 'react';
import {Map, TileLayer, WMSTileLayer, Marker} from 'react-leaflet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
//import Control from 'react-leaflet-control';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import EsriDynamicMapLayer from './EsriDynamicMapLayer';
import Config from './Config';
import 'leaflet.sync';
import './MapWrapper.css'
import './Handle.css';

library.add(faGripVertical);

class Handle extends React.Component {
  render() {
    const { provided, display_name } = this.props;
    return (
      <div className={display_name.length >= 40 ? "Handle map-title long-title" : "Handle map-title"}>
         <span className="Handle-span" {...provided.dragHandleProps}>
          <FontAwesomeIcon className="Handle-drag-icon" icon="grip-vertical" size="1x"/>
        </span>
         &nbsp;{display_name}
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
    this.onResize = this.onResize.bind(this);
    this.onGeocodeClick = this.onGeocodeClick.bind(this);
  }

  onResize(e) {
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
    this.passUpRef(this.props.layer.id, this.props.mapRef, true);

  }

  componentWillReceiveProps(nextProps) {

  }

  unsyncMaps(ref_id) {
     this.props.unsyncMaps(ref_id);
  }

  syncMaps() {
    this.props.syncMaps();
  }

  passUpRef(id, ref, deleteRef=false) {
    this.props.passUpRef(id, ref, deleteRef);
  }

  componentDidMount(prevProps, prevState){
    this.passUpRef(this.props.layer.id, this.props.mapRef);
  }

  clearGeocode() {
    this.props.clearGeocode();
  }

  onGeocodeClick() {
    console.log("click");
    this.clearGeocode();
  }

  onViewportChanged(viewport) { 
    //putting viewport into state results in (near) infinite loop of componentdidupdates
    //probably because L.sync is not react-ified
    //so just use good ole generic this.viewport instead
    this.viewport = viewport;
  }

  render() {
    const layer_components = {
      "EsriTiledMapLayer": EsriTiledMapLayer,
      "EsriDynamicMapLayer": EsriDynamicMapLayer,
      "WMSTileLayer": WMSTileLayer,
      "TileLayer": TileLayer
    }

    const layer = this.props.layer;
    let that = this;
    let Layer = layer_components[layer.type];
    const { provided } = this.props;
  

    // Use ids from layers array to create list of urls
    return (<div 
              {...provided.draggableProps}
              ref={provided.innerRef}>
              <Handle provided={provided} display_name={layer.display_name} />
              <Map ref={this.props.mapRef}
                 minZoom={11}
                 onResize={this.onResize}
                 maxZoom={layer.maxZoom}
                 onViewportChanged={that.onViewportChanged}
                 className ={'map'+ this.props.numberLayers + ' p' + this.props.layerIndex + " " + (this.props.isDragging ? "dragging": "nope")}  
                 id={layer.id}
                 key={layer.id} 
                 viewport={that.viewport}
                >
                {this.props.geocodeResult &&
                  <Marker position={this.props.geocodeResult}
                          onClick={this.onGeocodeClick}/>
                }
                  <TileLayer url={this.labelLayerUrl}
                    opacity={this.props.labelLayerOn ? 100 : 0}
                    pane="shadowPane"
                    zIndex={1000000} />
                  <Layer 
                    key={layer.id} 
                    url={layer.url}
                    layers={layer.layers}
                    maxZoom={layer.maxZoom}
                    opacity={layer.opacity}
                    />

            </Map>
          </div>
    )
  }
}  


export default React.forwardRef((props, ref) => <MapWrapper mapRef={ref} {...props} />);

