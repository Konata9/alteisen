import React, { Component } from "react";
import "./shape.scss";

import dragTarget from "../DragableItem/DragTarget";

@dragTarget({
  shape: "Rect"
})
export default class RectItem extends Component {
  render() {
    return (
      <div className="shape rect-item"/>
    );
  }
}
