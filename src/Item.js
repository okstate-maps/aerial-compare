import React, { Component } from 'react';
import { Textfit } from 'react-textfit';
import './Item.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
  }
 
  onClick(e) {
    this.setState(prevState => ({
      isToggledOn: !prevState.isToggledOn,
      opacity: 1.0
    }));
    this.props.onItemClick({
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
        <Textfit className="textfit" mode={this.props.display_name.length >= 40 ? 'multi' : 'single'} min={18} max={60}>
          {this.props.display_name}
        </Textfit>
      </div>
    );
  }
}

export default Item;
