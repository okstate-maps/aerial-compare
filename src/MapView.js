import React, { Component } from 'react';
import {Map, TileLayer, WMSTileLayer} from 'react-leaflet';
import Control from 'react-leaflet-control';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import MapWrapper from './MapWrapper';
import Config from './Config';
import 'leaflet.sync';
import './MapView.css';

//const { Map, TileLayer, Marker, Popup } = ReactLeaflet



class MapView extends Component {
  
  constructor(props, context) {
    super(props)
    this.mapboxToken = Config.mapboxToken;
    this.labelLayerUrl = Config.labelLayerUrl + this.mapboxToken;

    const DEFAULT_VIEWPORT = {
      center: [36.1156, -97.0584],
      zoom: 13
    }
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
  }


  invalidateMapSizes() {
    for (var i in this.refs){
      this.refs[i].leafletElement.invalidateSize();
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
  
  render() {

    // Use ids from layers array to create list of urls
    const layers = this.props.layers;
    const that = this;
    const labelLayerUrl = this.labelLayerUrl;
    let filtered_layers = layers.filter(lyr => {
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
                Click or tap on one of the years at the bottom of the screen. You
                can select up to 8 at a time. Click or tap it again to turn it off.
                </p>
             </div>
            );
    }

    else if (filtered_layers.length >= 1){
      
      let maps = filtered_layers.map( (layer, index) => {
          
          const inputRef = React.createRef(null);

          const draggableId = "draggable-"+ layer.id; 

          return (
              <Draggable className={'map'+ filtered_layers.length + ' p' + index}  
                      draggableId={draggableId} key={draggableId} index={index}>

                {(provided, snapshot) => (
                 <MapWrapper
                    layer={layer}
                    innerRef={provided.innerRef}
                    key={layer.id}
                    numberLayers={filtered_layers.length}
                    layerIndex={index}
                    provided={provided}
                    isDragging={snapshot.isDragging}

                    />
              )}

              </Draggable>
                
                          )
          });
        return maps;
      
    }
  }
}

export default MapView;
