import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Item from './Item';

class AddLayerItem extends Item {

  constructor(props) {
    super(props);
    library.add(faPlus);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
  }
 

  onClick(e) {
    let that = this;
    window.vex.dialog.open({
      message: 'Add a new layer!',
/*
    What an Item looks like.
                key={item.id} 
                type={item.type}   done 
                id={item.id}            done
                url={item.url}            done
                layers={item.layers} skip for now
                sortVal={item.sortVal}  
                display_name={item.display_name}
                thumbnail_file={item.thumbnail_file}
                maxZoom={item.maxZoom ? item.maxZoom : 20}
  */
      input: [
          '<style>',
              '.vex-custom-field-wrapper {',
                  'margin: 1em 0;',
              '}',
              '.vex-custom-field-wrapper > label {',
                  'display: inline-block;',
                  'margin-bottom: .2em;',
              '}',
          '</style>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="url">Url</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="url" type="text" value="https://api.mapbox.com/styles/v1/krdyke/cj9slcunc24xi2sqpg7xnsigk/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3JkeWtlIiwiYSI6Ik15RGcwZGMifQ.IR_NpAqXL1ro8mFeTIdifg"/>',
              '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="type">Type</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="type" id="TileLayer" type="radio" value="TileLayer" />',
                  '<label for="TileLayer">TileLayer</label><br>',
                  '<input name="type" type="radio" value="WMSTileLayer" />',
                  '<label for="WMSTileLayer">WMSTileLayer</label><br>',
                  '<input name="type" type="radio" value="EsriTiledMapLayer" />',
                  '<label for="EsriTiledMapLayer">EsriTiledMapLayer</label>',
              '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="display_name">Display Name</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="display_name" type="text" value="Orange" />',
              '</div>',
            '</div>'
         
      ].join(''),
      callback: function (data) {
          if (!data) {
              return console.log('Cancelled')
          }
          that.props.addLayer(data);
     }
    });
  }

  render() {
    return (
      <button className='add-layer item' 
          onClick={this.onClick} 
          id='add-layer'>
          <FontAwesomeIcon icon='plus' size="6x"/>
      </button>
    );
  }
}

export default AddLayerItem;
