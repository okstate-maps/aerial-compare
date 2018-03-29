import React, { Component } from 'react';
import Item from './Item';
import LayersInfo from './LayersInfo';
import './ViewBar.css';

class ViewBar extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.sortItems = this.sortItems.bind(this);
  }

  handleItemClick(data) {
    this.props.onItemClick(data);
  }

  sortItems(items) {

  }

  render() {
    const items = LayersInfo;
    return (
      <footer className='ViewBar-container bottom'>
        <div className='ViewBar-scroll left'></div>
         {items.map((item) => <Item 
              key={item.id} 
              type={item.type}
              id={item.id}
              url={item.url}
              layers={item.layers}
              display_name={item.display_name} 
              onItemClick={this.handleItemClick}

            />)}
      
        <div className='ViewBar-scroll right'></div>
      </footer>
    );
  }
}

export default ViewBar;
