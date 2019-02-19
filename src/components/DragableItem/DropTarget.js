import React, { Component } from "react";
import "./dragableItem.scss";
import { connect } from "react-redux";
import { setDragItem } from "../../stores/global/actions";
import { bindActionCreators } from "redux";

import { dataTransferDecode } from "../../utils";
import { DEFAULT_STYLE } from "../../constants";

@connect(
  (state) => ({
    global: state.global
  }),
  (dispatch) => ({
    setDragItem: bindActionCreators(setDragItem, dispatch)
  })
)
class DropTargetWrapper extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const domEle = this.ref.current;
    domEle.addEventListener("dragenter", this.onDragEnter);
    domEle.addEventListener("dragover", this.onDragOver);
    domEle.addEventListener("drop", this.onDrop);
  }

  componentWillUnmount() {
    const domEle = this.ref.current;
    domEle.removeEventListener("dragenter", this.onDragEnter);
    domEle.removeEventListener("dragover", this.onDragOver);
    domEle.removeEventListener("drop", this.onDrop);
  }

  render() {
    return (
      <div className="drop-target-wrapper" ref={this.ref}>
        {this.props.children}
      </div>
    );
  }

  onDragEnter = (e) => {
    e.preventDefault();
    return false;
  };

  onDragOver = (e) => {
    e.preventDefault();
    return false;
  };

  onDrop = (e) => {
    e.preventDefault();

    const { setDragItem } = this.props;
    const [id, shape] = dataTransferDecode(e, ["id", "shape"]);
    const style = {
      ...DEFAULT_STYLE[shape],
      left: e.offsetX,
      top: e.offsetY
    };

    setDragItem({
      id,
      shape,
      style
    });
  };
}

export default function dropTarget() {

  return (WrappedComponent) => {
    return class DropTarget extends Component {
      render() {
        return (
          <DropTargetWrapper {...this.props}>
            <WrappedComponent {...this.props} />
          </DropTargetWrapper>
        );
      }
    };
  };
}
