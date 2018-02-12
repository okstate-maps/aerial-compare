import React, { Component } from 'react';
import './Item.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onClickCallback = this.onClickCallback.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 0.5};
  }

  onClickCallback(){
    console.log("wooooooo");
    //when clicked, send a combination of state/props data up the pipeline to ViewBar->App->MapView
    this.props.onItemClick({
      "opacity": this.state.opacity,
      "isToggledOn": this.state.isToggledOn,
      "id": this.props.id
    });

  }

  onClick(e) {

    this.setState(prevState => ({
      isToggledOn: !prevState.isToggledOn,
      opacity: this.state.opacity
    }), this.onClickCallback());

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
