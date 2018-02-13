import React, { Component } from 'react';
import Item from './Item';
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
    const items = [
      {"id": "stw1938", "display_name": "1938"},
      {"id": "stw1949", "display_name": "1949"},
      {"id": "stw1956_tiles", "display_name": "1956"},
      {"id": "stw1969_3", "display_name": "1969"},
      {"id": "stw1979", "display_name": "1979"},
      {"id": "stw1969_3k_2", "display_name": "1969\n(OSU)"},
      {"id": "OSU_1978", "display_name": "1978\n(OSU)"},
      {"id": "osu1986_2", "display_name": "1986\n(OSU)"},
      {"id": "osu1996", "display_name": "1996\n(OSU)"}
    ];
    return (
      <div className='ViewBar-container bottom'>
        <ul>
            {items.map((item) => <Item 
              key={item.id} 
              id={item.id} 
              display_name={item.display_name} 
              onItemClick={this.handleItemClick}
            />)}
        </ul>
      </div>
    );
  }
}

export default ViewBar;
