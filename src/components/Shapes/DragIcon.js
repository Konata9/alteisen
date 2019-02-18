import React, { Component } from "react";
import dragTarget from "../DragableItem/DragTarget.js";
import Rect from "./BaseShape/Rect.js";
import Circle from "./BaseShape/Circle.js";

import "./shape.scss";

const shapeDictionary = {
  rect: Rect,
  circle: Circle
};

@dragTarget()
export default class DragIcon extends Component {
  render() {
    const { shape } = this.props;
    const RenderComponent = shapeDictionary[shape];

    return (
      <div className={`icon ${shape}-icon`}>
        <RenderComponent/>
      </div>
    );
  }
}