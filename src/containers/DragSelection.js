import React, { Component } from "react";
import "./../scss/dragSelection.scss";

const MOUSE_LEFT = 1;

export default class DragSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseStartPos: {},
      dragSelectionStyle: {}
    };
  }

  componentDidMount() {
    this.dragSelectionWrapper =
      document.getElementById("dragSelectionWrapper") || window.document;
    this.dragSelectionWrapper.addEventListener("mousedown", this.onMouseDown);
  }

  componentWillUnmount() {
    clearTimeout(this.mousedownTimer);
    this.dragSelectionWrapper.removeEventListener(
      "mousedown",
      this.onMouseDown
    );
  }

  render() {
    const { dragSelectionStyle } = this.state;

    return (
      <div className="canvas" id="dragSelectionWrapper">
        Drag canvas
        <div className="drag-selection-wrapper" style={dragSelectionStyle} />
      </div>
    );
  }

  onMouseDown = (e) => {
    e.preventDefault();
    clearTimeout(this.mousedownTimer);

    if (e.buttons !== MOUSE_LEFT || e.which !== MOUSE_LEFT) {
      return;
    }

    this.dragSelectionWrapper.addEventListener("mousemove", this.onMouseMove);
    this.dragSelectionWrapper.addEventListener("mouseup", this.onMouseUp);

    this.setState({
      dragSelectionStyle: {}
    });

    this.mousedownTimer = setTimeout(() => {
      this.onDragging = true;
      this.setState({
        mouseStartPos: {
          x: e.clientX,
          y: e.clientY
        }
      });
    }, 300);
  };

  onMouseMove = (e) => {
    e.preventDefault();
    if (!this.onDragging) {
      return;
    }

    const { mouseStartPos } = this.state;

    const mouseEndPos = {
      x: e.clientX,
      y: e.clientY
    };

    const mouseDragRange = {
      width: Math.round(Math.abs(mouseEndPos.x - mouseStartPos.x)),
      height: Math.round(Math.abs(mouseEndPos.y - mouseStartPos.y))
    };

    const drageSelectionPos = {
      left: Math.min(this.state.mouseStartPos.x, mouseEndPos.x),
      top: Math.min(this.state.mouseStartPos.y, mouseEndPos.y)
    };

    this.setState({
      dragSelectionStyle: {
        width: `${mouseDragRange.width}px`,
        height: `${mouseDragRange.height}px`,
        left: `${drageSelectionPos.left}px`,
        top: `${drageSelectionPos.top}px`,
        display: "block"
      }
    });
  };

  onMouseUp = (e) => {
    e.preventDefault();

    clearTimeout(this.mousedownTimer);
    this.dragSelectionWrapper.removeEventListener(
      "mousemove",
      this.onMouseMove
    );
    this.dragSelectionWrapper.removeEventListener("mouseup", this.onMouseUp);

    this.onDragging = false;
  };
}
