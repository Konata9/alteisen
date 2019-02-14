import React, { Component } from "react";
import "./rectItem.scss";

import dragTarget from "../DragableItem/DragTarget";

@dragTarget()
export default class RectItem extends Component {
  render() {
    const { type } = this.props;
    return <div className={`rect-item ${type === "icon" ? "icon" : ""}`} />;
  }
}
