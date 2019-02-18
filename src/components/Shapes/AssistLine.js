import React, { Component } from "react";

export default class AssistLine extends Component {
  render() {
    const { type, position, direction } = this.props;
    return (<div className={`assist-line assist-line-${type} assist-line-${direction}`} style={position}></div>);
  }
}