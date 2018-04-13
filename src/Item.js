import React, { Component } from 'react';
//import { Textfit } from 'react-textfit';
import './Item.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getNumberOfLayers = this.getNumberOfLayers.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
    
  }
 
  getNumberOfLayers(e){
    return document.querySelectorAll("footer .item.on").length;
  }

  onClick(e) {
    let numLyrs = this.getNumberOfLayers();
    if (numLyrs === 8) {
      if (!this.state.isToggledOn){
        window.vex.dialog.alert("Only 8 layers can be selected at once. Please deselect some in order to select new ones.");
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
      "url": this.props.url,
      "type": this.props.type,
      "display_name": this.props.display_name
    });
  }

  render() {
    return (
      <div className={this.state.isToggledOn ? 'item on' : 'item off'} 
          onClick={this.onClick} 
          style={{backgroundImage: "url('assets/images/thumb_" + this.props.id + ".JPG')"}}
          id={this.props.id}>
        <div>
          {this.props.display_name}
        </div>
      </div>
    );
  }
}

export default Item;
