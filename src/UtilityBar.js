import React, { Component } from 'react';



class UtilityBar extends Component {

  constructor(props) {
    super(props);
    this.mapboxToken = Config.mapboxToken;
  }
 
  componentDidMount(){
    console.log("UtilityBar mounted");
    let that = this;
    this.map = L.map('hidden-geocoder-map');
    this.geocoderObj = new L.Control.Geocoder(
      {
        "geocoder": new L.Control.Geocoder.Mapbox(
          this.mapboxToken,
          {
            "geocodingQueryParams": {
              "country": "US",
              "bbox":"-97.35122680664064,35.9357645138553,   \
                      -96.75178527832033,36.324530335021876"
            }
          }
        ),
        "collapsed": false,
        "suggestMinLength": 3,
        defaultMarkGeocode: false
      });
    this.geocoderObj.addTo(this.map);
    this.geocoderObj.on("markgeocode", e => that.transmitGeocode(e));
    let container = this.geocoderObj.getContainer();
    window.document.getElementById("Geocoder").appendChild(container);
  }

  transmitGeocode(geocode){
    this.props.transmitGeocode(geocode);
  }

  render() {
    return (
      <div id='Geocoder' className={'Geocoder'}>
        <div id='hidden-geocoder-map'></div>
      </div>
    );
  }
}

export default Geocoder;

