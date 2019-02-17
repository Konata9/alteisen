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
    const { global: { itemList } } = this.props;
    console.log(itemList);

    return (
      <div className="workspace-wrapper">
        {itemList.map((item, index) => (
          <CopyShape key={index} {...item} />
        ))}
      </div>
    );
  }
}
