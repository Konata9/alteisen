import React, { Component } from "react";
import "./dragSelection.scss";

const MOUSE_LEFT = 1;
const defaultOpts = {
  canvasStyle: {},
  targets: null,
  delay: 300
};

export default function dragSelectionWrapper(opts = defaultOpts) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return (WrappedComponent) => {
    return class DragSelection extends Component {
      constructor(props) {
        super(props);
        this.dragSelectionWrapper = null;
        this.targets = null;
        this.canvasRange = {};
        this.mouseStartPos = {};
        this.mouseEndPos = {};
        this.mouseDragRange = {};
        this.onDragging = false;
        this.selectedList = [];

        this.state = {
          canvasStyle: options.canvasStyle,
          dragSelectionStyle: {}
        };
      }

      componentDidMount() {
        this.dragSelectionWrapper =
          document.getElementById("dragSelectionCanvas") ||
          window.document.body;
        this.targets = options.targets
          ? document.querySelectorAll(options.targets)
          : null;
        this.canvasRange = this.setCanvasRange(this.dragSelectionWrapper);

        this.dragSelectionWrapper.addEventListener(
          "mousedown",
          this.onMouseDown
        );
      }

      setCanvasRange = (wrapperEle) => {
        const maxWidth = Math.round(
          wrapperEle.clientWidth + wrapperEle.offsetLeft
        );
        const maxHeight = Math.round(
          wrapperEle.clientHeight + wrapperEle.offsetTop
        );

        return {
          maxWidth,
          maxHeight
        };
      };

      componentWillUnmount() {
        clearTimeout(this.mousedownTimer);
        this.dragSelectionWrapper.removeEventListener(
          "mousedown",
          this.onMouseDown
        );
      }

      render() {
        const { canvasStyle, dragSelectionStyle } = this.state;

        return (
          <div
            className="drag-selection-canvas"
            id="dragSelectionCanvas"
            style={canvasStyle}
          >
            <WrappedComponent {...this.props} selectTargets={this.onSelect} />
            <div
              className="drag-selection-wrapper"
              style={dragSelectionStyle}
            />
          </div>
        );
      }

      onMouseDown = (e) => {
        this.eventHandleInit(e);
        if (!this.mouseDownEventCheck(e)) {
          return;
        }
        this.selectedList = [];
        this.dragSelectionWrapper.addEventListener(
          "mousemove",
          this.onMouseMove
        );
        this.dragSelectionWrapper.addEventListener("mouseup", this.onMouseUp);

        this.mousedownTimer = setTimeout(() => {
          this.onDragging = true;
          this.mouseStartPos = {
            x: e.clientX,
            y: e.clientY
          };
        }, options.delay);
      };

      mouseDownEventCheck = (e) => {
        if (e.buttons !== MOUSE_LEFT || e.which !== MOUSE_LEFT) {
          return false;
        }

        if (e.target !== this.dragSelectionWrapper) {
          return false;
        }

        return true;
      };

      onMouseMove = (e) => {
        e.preventDefault();
        if (!this.onDragging) {
          return;
        }

        this.mouseEndPos = this.calculateMouseEndPos(e);
        this.mouseDragRange = this.calculateMouseDragRange();
        this.dragSelectionPos = this.calculateDragSelectionPos();
        this.setDragSelectionStyle();
        this.getSelectTargets();
      };

      calculateMouseEndPos = (e) => {
        const { canvasRange } = this;
        const mouseEndPos = {
          x: Math.min(e.clientX, canvasRange.maxWidth),
          y: Math.min(e.clientY, canvasRange.maxHeight)
        };
        return mouseEndPos;
      };

      calculateMouseDragRange = () => {
        const { mouseEndPos, mouseStartPos } = this;
        const mouseDragRange = {
          width: Math.round(Math.abs(mouseEndPos.x - mouseStartPos.x)),
          height: Math.round(Math.abs(mouseEndPos.y - mouseStartPos.y))
        };
        return mouseDragRange;
      };

      calculateDragSelectionPos = () => {
        const { mouseEndPos, mouseStartPos } = this;
        const dragSelectionPos = {
          left: Math.min(mouseStartPos.x, mouseEndPos.x),
          top: Math.min(mouseStartPos.y, mouseEndPos.y)
        };
        return dragSelectionPos;
      };

      setDragSelectionStyle = () => {
        const { mouseDragRange, dragSelectionPos } = this;
        this.setState({
          dragSelectionStyle: {
            width: `${mouseDragRange.width}px`,
            height: `${mouseDragRange.height}px`,
            left: `${dragSelectionPos.left}px`,
            top: `${dragSelectionPos.top}px`,
            display: "block"
          }
        });
      };

      onMouseUp = (e) => {
        this.eventHandleInit(e);
        this.dragSelectionWrapper.removeEventListener(
          "mousemove",
          this.onMouseMove
        );
        this.dragSelectionWrapper.removeEventListener(
          "mouseup",
          this.onMouseUp
        );
      };

      getSelectTargets = () => {
        const { targets } = this;
        if (targets) {
          this.selectedList = [];
          targets.forEach((target) => {
            if (this.checkTargetInRange(target)) {
              this.selectedList.push(target);
            }
          });
        }
      };

      onSelect = () => this.selectedList;

      checkTargetInRange = (target) => {
        const { dragSelectionPos, mouseDragRange } = this;

        const targetRange = {
          left: target.offsetLeft,
          right: Math.round(target.offsetLeft + target.clientWidth),
          top: target.offsetTop,
          bottom: Math.round(target.offsetTop + target.clientHeight)
        };

        const drageRange = {
          left: dragSelectionPos.left,
          right: Math.round(dragSelectionPos.left + mouseDragRange.width),
          top: dragSelectionPos.top,
          bottom: Math.round(dragSelectionPos.top + mouseDragRange.height)
        };

        return (
          targetRange.left > drageRange.left &&
          targetRange.right < drageRange.right &&
          targetRange.top > drageRange.top &&
          targetRange.bottom < drageRange.bottom
        );
      };

      eventHandleInit = (e) => {
        const { mousedownTimer } = this;

        e.preventDefault();
        clearTimeout(mousedownTimer);

        this.onDragging = false;
        this.setState({
          dragSelectionStyle: {}
        });
      };
    };
  };
}
