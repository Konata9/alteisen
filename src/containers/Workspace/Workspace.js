import React, { Component } from "react";
import "./workspace.scss";
import { connect } from "react-redux";
import dropTarget from "../../components/DragableItem/DropTarget";

@connect((state) => ({
  global: state.global
}))
@dropTarget()
export default class Workspace extends Component {
  render() {
    console.log(global.dragItem);

    return <div className="workspace-wrapper" />;
  }
}
