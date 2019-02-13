import React, { Component } from "react";
import "./componentsbar.scss";

import RectItem from "../../components/Shapes/RectItem";

export default class Componentsbar extends Component {
  render() {
    return (
      <div className="componentsbar-wrapper">
        <RectItem type="icon" />
      </div>
    );
  }
}
