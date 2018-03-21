import React, { Component } from 'react';
import MapView from './MapView';
import ViewBar from './ViewBar';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
    this.state = {"layers":[]};
  }


  handleItemClick(data) {
    var found = false;
    var newState;

    this.state.layers.forEach(function(lyr, index){
      if (data.id === lyr.id){
        found = [true,index];
      }
    });

    if (!found){
      this.setState({"layers": [...this.state.layers, data]});
    }
    else {
      newState = JSON.parse(JSON.stringify(this.state));
      newState.layers[found[1]] = data;

      //rearrange the layers array so display order matches clicked order
      newState.layers.splice(newState.layers.length - 1, 0, newState.layers.splice(found[1], 1)[0]);
      this.setState(newState);

    }
  }


  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          Stillwater from the Air
        </header>
        <div id='maps'>
          <MapView layers={this.state.layers} />
        </div>
        <ViewBar onItemClick={this.handleItemClick} />
      </div>
    );
  }
}

export default App;
