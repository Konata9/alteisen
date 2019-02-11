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
    window.document.addEventListener("mousedown", this.onMouseDown);
  }

  componentWillUnmount() {
    clearTimeout(this.mousedownTimer);
    window.document.removeEventListener("mousedown", this.onMouseDown);
  }

  render() {
    const { dragSelectionStyle } = this.state;

    return (
      <div className="canvas">
        Drag canvas
        <div className="drag-selection-wrapper" style={dragSelectionStyle} />
      </div>
    );
  }

  onMouseDown = (e) => {
    console.log(e);
    e.preventDefault();
    clearTimeout(this.mousedownTimer);

    if (e.buttons !== MOUSE_LEFT || e.which !== MOUSE_LEFT) {
      return;
    }

    this.mousedownTimer = setTimeout(() => {
      window.document.addEventListener("mousemove", this.onMouseMove);
      window.document.addEventListener("mouseup", this.onMouseUp);

      this.onDragging = true;
      this.setState({
        mouseStartPos: {
          x: e.clientX,
          y: e.clientY
        }
      });
      console.log(this.onDragging);
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

    this.onDragging = false;
    console.log(this.state.onDragging);

    clearTimeout(this.mousedownTimer);
    window.document.removeEventListener("mousemove", this.onMouseMove);
    window.document.removeEventListener("mouseup", this.onMouseUp);
  };
}
