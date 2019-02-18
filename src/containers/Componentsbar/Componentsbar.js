import React, { Component } from "react";
import "./componentsbar.scss";

import DragIcon from "../../components/Shapes/DragIcon";

export default class Componentsbar extends Component {
  render() {
    return (
      <div className="componentsbar-wrapper">
        <DragIcon shape='rect'/>
        <DragIcon shape='circle'/>
      </div>
    );
  }
}
