import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

class MapsContainer extends React.Component {
  render() {
    const { provided, innerRef, children, rows } = this.props;
    return (
      <div id='maps'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {rows}
            </DragDropContext>
      </div>
    );
  }
}

export default MapsContainer;