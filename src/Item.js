import React, { Component } from 'react';
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
      "id": this.props.id
    });
  }

  render() {
    return (
      <li className={this.state.isToggledOn ? 'item on' : 'item off'} 
          onClick={this.onClick} 
          id={this.props.id}> 
        <span>{this.props.display_name}</span>
      </li>
    );
  }
}

export default Item;
