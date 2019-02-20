import React, { Component } from "react";
import "./workspace.scss";
import { connect } from "react-redux";
import dropTarget from "../../components/DragableItem/DropTarget";
import EditableShape from "../../components/Shapes/EditableShape.js";
import AssistLine from "../../components/Shapes/AssistLine";
import { bindActionCreators } from "redux";
import { clearResizableBorder, clearSelectedItem, clearWorkspaceState } from "../../stores/global/actions";

@connect((state) => ({
  global: state.global
}), (dispatch) => ({
  clearResizableBorder: bindActionCreators(clearResizableBorder, dispatch),
  clearSelectedItem: bindActionCreators(clearSelectedItem, dispatch),
  clearWorkspaceState: bindActionCreators(clearWorkspaceState, dispatch)
}))
@dropTarget()
export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("click", this.onClick);
  }

  render() {
    const { global: { shapeList, assistLineList } } = this.props;

    return (
      <div className="workspace-wrapper" ref={this.ref}>
        {shapeList.map((item, index) => (
          <EditableShape key={index} {...item} />
        ))}

        {assistLineList.map((item, index) => (
          <AssistLine key={index} {...item} />
        ))}
      </div>
    );
  }

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { clearResizableBorder, clearSelectedItem, clearWorkspaceState, global: { selectedItem } } = this.props;
    if (selectedItem) {
      clearResizableBorder();
      clearSelectedItem();
      clearWorkspaceState();
    }
  };
}
