import React, { Component } from "react";
import "./workspace.scss";
import { connect } from "react-redux";
import dropTarget from "../../components/DragableItem/DropTarget";
import EditableShape from "../../components/Shapes/EditableShape.js";
import AssistLine from "../../components/Shapes/AssistLine";

@connect((state) => ({
  global: state.global
}))
@dropTarget()
export default class Workspace extends Component {
  render() {
    const { global: { shapeList, assistLineList } } = this.props;

    return (
      <div className="workspace-wrapper">
        {shapeList.map((item, index) => (
          <EditableShape key={index} {...item} />
        ))}

        {assistLineList.map((item, index) => (
          <AssistLine key={index} {...item} />
        ))}
      </div>
    );
  }
}
