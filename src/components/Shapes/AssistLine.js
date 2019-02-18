import React, { Component } from "react";

export default class AssistLine extends Component {
  render() {
    const { type, position } = this.props;
    return (<div className={`assist-line assist-line-${type}`} style={position}></div>);
  }
}