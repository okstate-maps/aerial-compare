import React from 'react';
import ReactDOM from 'react-dom';
import {Map, TileLayer, WMSTileLayer} from 'react-leaflet';
import Control from 'react-leaflet-control';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const position = [36.1156, -97.0584];
  const zoom = 13;
  ReactDOM.render(
 			 <Map key="map0" 
                center={position}
                zoom={zoom}>

             	<WMSTileLayer
		          url="https://gis.apfo.usda.gov/arcgis/services/NAIP/Oklahoma/ImageServer/WMSServer"
		          layers="0"
		          attribution="<a href='https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/Oklahoma/ImageServer'>NAIP</a>"
		        />  
              <Control position="topright">
                <span className="map-title">Test</span>
              </Control>
            </Map>
  	, div);
  ReactDOM.unmountComponentAtNode(div);
});
