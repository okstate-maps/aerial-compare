import React, { Component } from 'react';
//import sortOn from 'sort-on';
//import FlipMove from 'react-flip-move';
import Item from './Item';
import AddLayerItem from './AddLayerItem';
import ScrollButton from './ScrollButton';
import LayersInfo from './LayersInfo';
import './ViewBar.css';

class ViewBar extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleScrollButtonClick = this.handleScrollButtonClick.bind(this);
    //this.sortItems = this.sortItems.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.onWheel = this.onWheel.bind(this);
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

  addLayer(data) {
    console.log(data);
    let state = this.state,
      new_layer = data,
      id = new_layer.display_name + "_new", //lazy id baby
      sortVal = this.state.layers.slice(-1)[0].sortVal - 1,
      thumbnail_file = "dummy.png",
      maxZoom = 20;

    new_layer.id = id;
    new_layer.sortVal = sortVal;
    new_layer.thumbnail_file = thumbnail_file;
    new_layer.maxZoom = maxZoom;
    
    state.layers.push(new_layer);
    delete(state.new_layer_data);
    this.setState(state);
  }

  componentWillUpdate(){
    //console.log("ViewBar WillUpdate");

  }

  componentDidUpdate(prevProps, prevState){
    
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


  onWheel(e){
    let elem  = document.getElementById("viewbarItems"),
        scrollUnit = 50,

        // deltaMode indicates if the deltaY value is pixels or lines (0 for pixels, 1 for lines, 2 for page)
        deltaMode = e.deltaMode,

        //if the deltamode is anything but pixels (0), use scroll unit to calculate scroll amount
        scrollSize = deltaMode === (1 || 2) ? e.deltaY * scrollUnit: e.deltaY;

    e.preventDefault();
    
    elem.scrollLeft = elem.scrollLeft + scrollSize;
    //this.setState({"scrollLeft": elem.scrollLeft});
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
         <div onWheel={this.onWheel} className='flip-move' id="viewbarItems">
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
           <AddLayerItem numberOfLayersOn={this.props.numberOfLayersOn} addLayer={this.addLayer} />
          {/*</FlipMove>*/}
          </div>
        <ScrollButton direction="right" onClick={this.handleScrollButtonClick}/>
      </footer>
    );
  }
}

export default ViewBar;
