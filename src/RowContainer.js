import React, { Component } from 'react';

class RowContainer extends React.Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div className={this.props.className} {...provided.droppableProps} ref={innerRef}>
        {children}
        {provided.placeholder}
      </div>
    );
  }
}

export default RowContainer;