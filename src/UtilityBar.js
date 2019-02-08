import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import Geocoder from './Geocoder';
import './UtilityBar.css';

library.add(faExpand);
library.add(faCompress);

class UtilityBar extends Component {

  constructor(props) {
    super(props);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.state = {};
  }
 
  componentDidMount(){
    console.log("UtilityBar mounted");
   }

  transmitGeocode(geocode){
    this.props.transmitGeocode(geocode);
  }

  render() {
    return (
      <div id='UtilityBar' className={'UtilityBar'}>
        <Geocoder transmitGeocode={this.transmitGeocode} />
        <div>
          <button onClick={() => this.props.toggleFullscreen()}>
            <FontAwesomeIcon icon={this.props.isFullscreenEnabled ? "compress" : "expand"} size="2x"/>
          </button>
        </div>
        
      </div>
    );
  }
}

export default UtilityBar;

