import React, { Component } from 'react';
import Item from './Item';
import LayersInfo from './LayersInfo';
import './ViewBar.css';

class ViewBar extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(data) {
   // console.log("handleItemClick in ViewBar")
   // console.log(data)
    this.props.onItemClick(data);
  }

  render() {
    const items = LayersInfo;
    return (
      <div className='ViewBar-container bottom'>
        <ul>
            {items.map((item) => <Item 
              key={item.id} 
              type={item.type}
              id={item.id}
              url={item.url}
              layers={item.layers}
              display_name={item.display_name} 
              onItemClick={this.handleItemClick}
            />)}
        </ul>
      </div>
    );
  }
}

export default ViewBar;
