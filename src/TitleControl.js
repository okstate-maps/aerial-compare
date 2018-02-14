import { Control } from 'leaflet'
import { Component, type Element } from 'react'
import {MapControl} from 'react-leaflet';

export default class TitleControl extends MapControl {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  componentWillMount() {
    super.componentWillMount();
    const {map: _map, layerContainer: _lc, ...props, } = this.props;
    this.leafletElement = tiledMapLayer(props); 
  }
}