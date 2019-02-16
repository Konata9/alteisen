import React, { Component } from "react";
import "./dragableItem.scss";
import { connect } from "react-redux";
import { setDragItem } from "../../stores/global/actions";
import { bindActionCreators } from "redux";

import { dataTransferDecode } from "../../utils";

@connect(
  (state) => ({
    global: state.global
  }),
  (dispatch) => ({
    setDragItem: bindActionCreators(setDragItem, dispatch)
  })
)
class DropEnhancer extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      eleStyle: {}
    };
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
    const { eleStyle } = this.state;
    return (
      <div className="drop-target-wrapper" ref={this.ref} style={eleStyle}>
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
    const [shape, action] = dataTransferDecode(e, ["shape", "action"]);

    setDragItem({
      shape,
      action,
      position: {
        left: Math.round(e.clientX - e.target.offsetLeft),
        top: Math.round(e.clientY - e.target.offsetTop)
      }
    });
  };
}

const defaultOpts = {};

export default function dropTarget(opts = defaultOpts) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return (WrappedComponent) => {
    return class DropWrapper extends Component {
      render() {
        return (
          <DropEnhancer options={options} {...this.props}>
            <WrappedComponent {...this.props} />
          </DropEnhancer>
        );
      }
    };
  };
}
