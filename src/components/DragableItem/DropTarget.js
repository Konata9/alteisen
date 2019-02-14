import React, { Component } from "react";
import "./dragableItem.scss";

const defaultOpts = {};

export default function dropTarget(opts = defaultOpts) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return (WrappedComponent) => {
    return class DropTarget extends Component {
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
            <WrappedComponent {...this.props} />
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
        console.log("ondrop");
        console.log(e.dataTransfer);
      };
    };
  };
}
