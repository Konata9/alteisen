import React, { Component } from "react";

export default class ResizableDot extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      mousePos: {}
    };
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  render() {
    const { direction } = this.props;
    return (
      <div className={`resize-dot dot-${direction}`} ref={this.ref} data-shape="dot"/>
    );
  }

  onMouseDown = (e) => {
    const ele = this.ref.current;
    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      }
    });

    ele.addEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = (e) => {
    console.log("dot", e.target);
    const { direction, global: { selectedItem }, updateShapeList } = this.props;
    const { mousePos } = this.state;
    if (direction === "right") {
      const diffX = e.clientX - mousePos.x;
      selectedItem.style = {
        ...selectedItem.style,
        width: selectedItem.style.width + diffX
      };

      updateShapeList(selectedItem);
    }

    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      }
    });
  };

  onMouseUp = (e) => {
    const ele = this.ref.current;
    ele.removeEventListener("mousemove", this.onMouseMove);
  };
}