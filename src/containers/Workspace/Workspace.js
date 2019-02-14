import React, { Component } from "react";
import "./workspace.scss";

import dropTarget from "../../components/DragableItem/DropTarget";

@dropTarget()
export default class Workspace extends Component {
  render() {
    return <div className="workspace-wrapper">3</div>;
  }
}
