import React, { Component } from 'react';
import logo from './logo.svg';
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
    this.setState({"layers": this.state.layers.concat([data])});
  }


  render() {
    const layers = this.state.layers;
    return (
      <div className="App">
        <header className="App-header">
          Stillwater Aerials
        </header>
        <MapView layers={layers} />
        <ViewBar onItemClick={this.handleItemClick} />
      </div>
    );
  }
}

export default App;
