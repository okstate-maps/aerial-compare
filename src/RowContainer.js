import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import MapWrapper from './MapWrapper';

class RowContainer extends React.Component {

  render() {
    const { provided, snapshot, innerRef, layers } = this.props;

  	let maps = layers.map((layer, index) => (
		<Draggable draggableId={"draggable-"+layer.id} 
				   key={"draggable-"+layer.id} 
				   index={index}>
		 	{(provided, snapshot) => (
		  	<MapWrapper
		        layer={layer}
		        innerRef={provided.innerRef}
		        key={layer.id}
		        numberLayers={layers.length}
		        layerIndex={index}
		        provided={provided}
		        isDragging={snapshot.isDragging}
		        passUpRef={this.props.passUpRef}
		        mapRef={this.props.mapRef}
		        syncMaps={this.props.syncMaps}
		        unsyncMaps={this.props.unsyncMaps}
		        labelLayerOn={this.props.labelLayerOn}
		        invalidateMapSizes={this.props.invalidateMapSizes}
		        />
		 	)}
	  </Draggable>
    ));


    return (
    	//<div><h1>poop</h1></div>
      <div className={this.props.className} 
      	   ref={provided.innerRef}
      	   {...provided.droppableProps}>
      	{maps}
        {provided.placeholder}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <RowContainer mapRef={ref} {...props} />);;
//export default RowContainer;