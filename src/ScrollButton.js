import React, { Component } from 'react';
import './ScrollButton.css';

class ScrollButton extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
 
  onClick(e) {
    this.props.onClick(this.props.direction);
  }

  render() {
    let arrow = this.props.direction === "left" ? "\u25c0" : "\u25b6";
    return (
      <div className={'ScrollButton ' + this.props.direction}
           onClick={this.onClick}>  
        {arrow}
      </div>
    );
  }
}

export default ScrollButton;

