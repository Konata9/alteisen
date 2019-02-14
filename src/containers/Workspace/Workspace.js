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
    const { global } = this.props;
    console.log(global.draggingItem);

    return (
      <div className="workspace-wrapper">
        {global.draggingItem.map((item) => item)}
      </div>
    );
  }
}
