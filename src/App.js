import React, { Component } from 'react';
import Vex from 'vex-js';
import plugin from 'vex-dialog';
import MapView from './MapView';
import ViewBar from './ViewBar';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    window.vex = Vex;
    window.vex.registerPlugin(plugin);
    window.vex.defaultOptions.className = 'vex-theme-os';
    this.state = {"layers":[], "numberOfLayers": 0};
    
  }


  handleItemClick(data) {
    let found = false;
    let newState;

    this.state.layers.forEach(function(lyr, index){
      if (data.id === lyr.id){
        found = [true,index];
      }
    });

    if (!found){
      this.setState({
        "layers": [...this.state.layers, data],
        "numberOfLayers": [...this.state.layers, data].length
      });

    }
    else {
      newState = JSON.parse(JSON.stringify(this.state));
      newState.layers[found[1]] = data;

      //rearrange the layers array so display order matches clicked order
      newState.layers.splice(newState.layers.length - 1,
        0, newState.layers.splice(found[1], 1)[0]
      );
      newState.numberOfLayers = newState.layers.length;
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
        <ViewBar onItemClick={this.handleItemClick} numberOfLayers={this.state.numberOfLayers}/>
      </div>
    );
  }
}

export default App;
