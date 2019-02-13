import React, { Component } from "react";
import Toolbar from "./Toolbar/Toolbar";
import Componentsbar from "./Componentsbar/Componentsbar";
import Infobar from "./Infobar/Infobar";
import Workspace from "./Workspace/Workspace";

export default class Canvas extends Component {
  render() {
    return (
      <div className="canvas-wrapper">
        <Toolbar />
        <Componentsbar />
        <Infobar />
        <Workspace />
      </div>
    );
  }
}
