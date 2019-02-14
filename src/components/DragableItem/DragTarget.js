import React, { Component } from "react";

const defaultOpts = {};

export default function dragTarget(opts = defaultOpts) {
  return (WrappedComponent) => {
    return class DragTarget extends Component {
      constructor(props) {
        super(props);
        this.ref = React.createRef();
      }

      componentDidMount() {
        const domEle = this.ref.current;
        domEle.addEventListener("dragstart", this.onDragStart);
        domEle.addEventListener("dragend", this.onDragEnd);
      }

      componentWillUnmount() {
        const domEle = this.ref.current;
        domEle.removeEventListener("dragstart", this.onDragStart);
        domEle.removeEventListener("dragend", this.onDragEnd);
      }

      render() {
        return (
          <div ref={this.ref} draggable={true} className="drag-target-wrapper">
            <WrappedComponent {...this.props} />
          </div>
        );
      }

      onDragStart = (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.target.style.opacity = 0.5;
        console.log("start");
        console.log(e.dataTransfer);
      };

      onDragEnd = (e) => {
        e.target.style.opacity = "";
        console.log("end");
      };
    };
  };
}
