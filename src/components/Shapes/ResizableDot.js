import React, { Component } from "react";

export default class ResizableDot extends Component {
  render() {
    const { direction } = this.props;
    return (
      <div className={`resize-dot dot-${direction}`}/>
    );
  }
}