import React, { Component } from "react";
import "./workspace.scss";
import { connect } from "react-redux";
import dropTarget from "../../components/DragableItem/DropTarget";
import CopyShape from "../../components/Shapes/CopyShape";

@connect((state) => ({
  global: state.global
}))
@dropTarget()
export default class Workspace extends Component {
  render() {
    const {
      global: { shapeList }
    } = this.props;

    return (
      <div className="workspace-wrapper">
        {shapeList.map((shape, index) => (
          <CopyShape key={index} type={shape.type} />
        ))}
      </div>
    );
  }
}
