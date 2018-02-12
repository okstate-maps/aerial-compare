import React, { Component } from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import Sync from 'leaflet.sync';
import './MapView.css';

//const { Map, TileLayer, Marker, Popup } = ReactLeaflet

class MapView extends Component {
  
  constructor(props, context) {
    super(props)
    this.arcgis_service_url = 'https://tiles.arcgis.com/tiles/jWQlP64OuwDh6GGX/arcgis/rest/services/{{id}}/MapServer';
    this.state = {
      lat: 36.1156,
      lng: -97.0584,
      zoom: 13
    }
    this.syncMaps = this.syncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
  }

  invalidateMapSizes() {
    for (var i in this.refs){
      this.refs[i].leafletElement.invalidateSize();
    }
  }
  
  syncMaps() {
    for (var i in this.refs){
      for (var j in this.refs){
        if (i != j){
          this.refs[i].leafletElement.setView(
            {"lat": this.state.lat,"lng": this.state.lng}, 
            this.state.zoom
          );
          this.refs[i].leafletElement.sync(this.refs[j].leafletElement);
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    this.invalidateMapSizes();
    this.syncMaps();
  }


  render() {
    const position = [this.state.lat, this.state.lng]

    // Use ids from layers array to create list of urls
    const layers = this.props.layers;
    var map_counter = 0;
    var filtered = layers.forEach(function(lyr){
      if(lyr.isToggledOn){
        map_counter++;
      }
    });
    console.log(map_counter);


    if (layers.length === 0){

      return (
      
        <Map ref='map0' className='map0' center={position} zoom={this.state.zoom}>
          <Marker position={position}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
          <TileLayer
            attribution='&copy; <a href="http://mapbox.com">Mapbox</a>'
            url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg'
          />      
        </Map>
      );
    }

    else if (layers.length >= 1){
      return (
        <div id='maps'>
          {layers.map((layer, index) =>

            <Map ref={'map'+ index} className ={'map'+ layers.length + ' p' + index}  key={layer.id} center={position} zoom={this.state.zoom}>
              <Marker position={position}>
                <Popup>
                  <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                </Popup>
              </Marker>
              <TileLayer
                attribution='&copy; <a href="http://mapbox.com">Mapbox</a>'
                url='https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg'
              />      
               <EsriTiledMapLayer key={layer.id} url={this.arcgis_service_url.replace("{{id}}", layer.id)} />
            </Map>
          )}
        </div>
      );
    }
  }
}

export default MapView;
