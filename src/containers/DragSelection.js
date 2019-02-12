import React, { Component } from "react";
import "./../scss/dragSelection.scss";

const MOUSE_LEFT = 1;
const defaultOpts = {
  canvasStyle: {},
  captureTarget: null,
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
        this.mouseStartPos = {};
        this.selectedList = [];
        this.state = {
          canvasStyle: options.canvasStyle,
          dragSelectionStyle: {}
        };
      }

      componentDidMount() {
        this.dragSelectionWrapper =
          document.getElementById("dragSelectionWrapper") || window.document;

        this.canvasRange = {
          maxWidth:
            Math.round(
              this.dragSelectionWrapper.clientWidth +
                this.dragSelectionWrapper.offsetLeft
            ) || Math.round(window.document.body.clientWidth),
          maxHeight:
            Math.round(
              this.dragSelectionWrapper.clientHeight +
                this.dragSelectionWrapper.offsetTop
            ) || Math.round(window.document.body.clientHeight)
        };

        this.dragSelectionWrapper.addEventListener(
          "mousedown",
          this.onMouseDown
        );
      }

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
            id="dragSelectionWrapper"
            style={canvasStyle}>
            <WrappedComponent
              {...this.props}
              selectTargets={() => this.selectedList}
            />
            <div
              className="drag-selection-wrapper"
              style={dragSelectionStyle}
            />
          </div>
        );
      }

      onMouseDown = (e) => {
        e.preventDefault();
        clearTimeout(this.mousedownTimer);

        if (e.buttons !== MOUSE_LEFT || e.which !== MOUSE_LEFT) {
          return;
        }

        this.dragSelectionWrapper.addEventListener(
          "mousemove",
          this.onMouseMove
        );
        this.dragSelectionWrapper.addEventListener("mouseup", this.onMouseUp);

        this.setState({
          dragSelectionStyle: {}
        });

        this.mousedownTimer = setTimeout(() => {
          this.onDragging = true;
          this.mouseStartPos = {
            x: e.clientX,
            y: e.clientY
          };
        }, options.delay);
      };

      onMouseMove = (e) => {
        e.preventDefault();
        if (!this.onDragging) {
          return;
        }

        this.mouseEndPos = {
          x: Math.min(e.clientX, this.canvasRange.maxWidth),
          y: Math.min(e.clientY, this.canvasRange.maxHeight)
        };

        this.mouseDragRange = {
          width: Math.round(
            Math.abs(this.mouseEndPos.x - this.mouseStartPos.x)
          ),
          height: Math.round(
            Math.abs(this.mouseEndPos.y - this.mouseStartPos.y)
          )
        };

        this.drageSelectionPos = {
          left: Math.min(this.mouseStartPos.x, this.mouseEndPos.x),
          top: Math.min(this.mouseStartPos.y, this.mouseEndPos.y)
        };

        this.setState({
          dragSelectionStyle: {
            width: `${this.mouseDragRange.width}px`,
            height: `${this.mouseDragRange.height}px`,
            left: `${this.drageSelectionPos.left}px`,
            top: `${this.drageSelectionPos.top}px`,
            display: "block"
          }
        });

        this.selectTargets();
      };

      onMouseUp = (e) => {
        e.preventDefault();

        clearTimeout(this.mousedownTimer);
        this.onDragging = false;
        this.setState({
          dragSelectionStyle: {}
        });
        this.dragSelectionWrapper.removeEventListener(
          "mousemove",
          this.onMouseMove
        );
        this.dragSelectionWrapper.removeEventListener(
          "mouseup",
          this.onMouseUp
        );
      };

      selectTargets = () => {
        if (options.captureTarget) {
          this.selectedList = [];
          const targets = document.querySelectorAll(options.captureTarget);
          targets.forEach((target) => {
            console.dir(target);
            target.style.border = "";
            if (
              target.offsetLeft > this.drageSelectionPos.left &&
              target.offsetTop > this.drageSelectionPos.top &&
              target.offsetLeft + target.clientWidth <
                this.drageSelectionPos.left + this.mouseDragRange.width &&
              target.offsetTop + target.clientHeight <
                this.drageSelectionPos.top + this.mouseDragRange.height
            ) {
              target.style.border = "1px solid red";
              this.selectedList.push(target);
            }
          });
        }
      };
    };
  };
}
