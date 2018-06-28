import React, { Component } from 'react';
//import sortOn from 'sort-on';
//import FlipMove from 'react-flip-move';
import Item from './Item';
import ScrollButton from './ScrollButton';
import LayersInfo from './LayersInfo';
import './ViewBar.css';

class ViewBar extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleScrollButtonClick = this.handleScrollButtonClick.bind(this);
    //this.sortItems = this.sortItems.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.easeInOutQuad = this.easeInOutQuad.bind(this);
  }

  handleItemClick(data) {
    let id = data.id;
    let newState = JSON.parse(JSON.stringify(this.state));
    newState.layers.forEach( (lyr,index) => {
      if (lyr.id === id) {
        newState.layers[index] = data;
      }
    });

    //sorting is not working crossbrowser atm
    //newState.layers = this.sortItems(newState.layers);
    this.setState(newState);   
    this.props.onItemClick(data);
  }

  handleScrollButtonClick(scrollDirection) {
    //console.log(scrollDirection);
    this.scrollTo(scrollDirection, 350);

  }

  componentWillUpdate(){
    //console.log("ViewBar WillUpdate");

  }

  componentDidUpdate(prevProps, prevState){
    //console.log("ViewBar DidUpdate");
  }

  componentWillMount(prevProps, prevState){
    //for the initial app load, set state using LayersInfo
    //console.log("ViewBar mounted");
    let layers = LayersInfo.map(item => ({...item, isToggledOn: false}));
    layers = layers.sort( (a, b) => {
      return b.sortVal - a.sortVal 
    })
    this.setState({"layers": layers});
  }

  // sortItems(layers) {
  //   layers = layers.sort( (a, b) =>, "isToggledOn");
  //   let toggledOnSubarray = layers.filter(lyr => lyr.isToggledOn);
  //   console.log(toggledOnSubarray);
  //   let offSubarray = layers.filter(lyr => !lyr.isToggledOn);
  //   console.log(offSubarray);
  //   offSubarray = sortOn(offSubarray, "-sortVal");
  //   return toggledOnSubarray.concat(offSubarray);
  // }

  onScroll(e){
    this.setState({"scrollLeft": e.nativeEvent.target.scrollLeft});
  }

  scrollTo(direction, duration) {
    let elem  = document.getElementById("viewbarItems"),
        start = elem.scrollLeft,
        clientWidth = document.documentElement.clientWidth,
        moveSize = Math.max(clientWidth/2, 300),
        change = direction === "left" ? -moveSize : +moveSize,
        currentTime = 0,
        increment = 20,
        that = this;
        
    let animateScroll = function(){        
        currentTime += increment;
        let val = that.easeInOutQuad(currentTime, start, change, duration);
        elem.scrollLeft = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
  }

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }

  render() {
    const items = this.state.layers;
    
    return (
      <footer className='ViewBar-container bottom'>
        <ScrollButton direction="left" onClick={this.handleScrollButtonClick}/>
         {/*<FlipMove onScroll={this.onScroll} scrollleft={this.state.scrollLeft} className='flip-move' duration={500} easing="ease-out" id="viewbarItems">*/}
         <div onScroll={this.onScroll} scrollleft={this.state.scrollLeft} className='flip-move' id="viewbarItems">
           {items.map(item => <Item 
                numberOfLayersOn={this.props.numberOfLayersOn}
                key={item.id} 
                type={item.type}
                id={item.id}
                url={item.url}
                layers={item.layers}
                sortVal={item.sortVal}
                display_name={item.display_name}
                thumbnail_file={item.thumbnail_file}
                maxZoom={item.maxZoom ? item.maxZoom : 20}
                onItemClick={this.handleItemClick}
              />)}
          {/*</FlipMove>*/}
          </div>
        <ScrollButton direction="right" onClick={this.handleScrollButtonClick}/>
      </footer>
    );
  }
}

export default ViewBar;
