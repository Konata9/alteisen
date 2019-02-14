import React, { Component } from "react";
import "./dragableItem.scss";
import { connect } from "react-redux";

@connect((state) => ({
  global: state.global
}))
class DropEnhancer extends Component {
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
      <div ref={this.ref} className="drop-target-wrapper">
        {this.props.children}
      </div>
    );
  }

  onDragEnter = (e) => {
    e.preventDefault();
    console.log("drag enter");
    console.log(e.dataTransfer);
    return false;
  };

  onDragOver = (e) => {
    e.preventDefault();
    return false;
  };

  onDrop = (e) => {
    e.preventDefault();
  };
}

const defaultOpts = {
  copy: false
};

export default function dropTarget(opts = defaultOpts) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return (WrappedComponent) => {
    return class DropWrapper extends Component {
      render() {
        return (
          <DropEnhancer {...options}>
            <WrappedComponent {...this.props} />
          </DropEnhancer>
        );
      }
    };
  };
}
