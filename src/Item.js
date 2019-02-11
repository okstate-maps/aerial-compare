import React, { Component } from 'react';
import Config from './Config';
import './Item.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
  }
 
  onClick(e) {

    let numLyrs = this.props.numberOfLayersOn;
    if (numLyrs === 8) {
      if (!this.state.isToggledOn){
        window.vex.dialog.alert(Config.maxLayersWarning);
        return
      }
    }

    this.setState(prevState => ({
      isToggledOn: !prevState.isToggledOn,
      opacity: 1.0
    }));

    this.props.onItemClick({
      "sortVal": this.props.sortVal,
      "opacity": 1.0,
      "isToggledOn": !this.state.isToggledOn,
      "id": this.props.id,
      "thumbnail_file": this.props.thumbnail_file,
      "url": this.props.url,
      "type": this.props.type,
      "layers": this.props.layers,
      "maxZoom": this.props.maxZoom,
      "display_name": this.props.display_name
    });
  }

  render() {
    return (
      <button className={this.state.isToggledOn ? 'item on' : 'item off'} 
          onClick={this.onClick} 
          style={{backgroundImage: "url('assets/images/" + this.props.thumbnail_file + "')"}}
          id={this.props.id}>
        <div className="label">
          {this.props.display_name.length >= 40 ? this.props.display_name.slice(0,this.props.display_name.slice(0,41).lastIndexOf(" "))+"..." : this.props.display_name}
        </div>

        <div className="button">

        </div>
      </button>
    );
  }
}

export default Item;
