import React, { Component } from "react";

const defaultOpts = {};

export default function dargTarget(opts = defaultOpts) {
  return (WrappedComponent) => {
    return class DragTarget extends Component {
      constructor(props) {
        super(props);
        this.ref = React.createRef();
      }

      componentDidMount() {
        const domEle = this.ref.current;
        domEle.addEventListener("ondragstart", this.onDragStart);
      }

      render() {
        return (
          <div ref={this.ref} draggable={true}>
            <WrappedComponent {...this.props} />
          </div>
        );
      }

      onDragStart = (e) => {
        console.log(e.dataTransfer);
      };
    };
  };
}
