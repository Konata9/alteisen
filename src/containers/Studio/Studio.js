import React, { Component } from "react";
import Toolbar from "../Toolbar/Toolbar";
import Componentsbar from "../Componentsbar/Componentsbar";
import Infobar from "../Infobar/Infobar";
import Workspace from "../Workspace/Workspace";
import "./studio.scss";

export default class Studio extends Component {
  render() {
    return (
      <div className="studio-wrapper">
        <Toolbar />
        <div className="workspace-layout">
          <Componentsbar />
          <Workspace />
          <Infobar />
        </div>
      </div>
    );
  }
}
