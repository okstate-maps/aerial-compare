import React, { Component } from 'react';
import Geocoder from './Geocoder';
import Fullscreen from 'react-fullscreen-crossbrowser';
import './UtilityBar.css';

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
        <button onClick={() => this.setState({isFullscreenEnabled: true})}>
          Go Fullscreen
        </button>

        <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}
        />
      </div>
    );
  }
}

export default UtilityBar;

