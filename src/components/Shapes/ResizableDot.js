import React, { Component } from "react";
import { LIMIT, WORKSPACE_STATES } from "../../constants";
import { judgeLimit, calculateAngle } from "../../utils";

export default class ResizableDot extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      mousePos: {},
      rightLimit: null,
      bottomLimit: null
    };
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("mousedown", this.onMouseDown);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("mousedown", this.onMouseDown);
  }

  render() {
    const { direction } = this.props;
    return (
      <div className={`resize-dot dot-${direction}`} ref={this.ref} data-shape="dot"/>
    );
  }

  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { setWorkspaceState, global: { selectedItem } } = this.props;
    setWorkspaceState(WORKSPACE_STATES.IN_RESIZING);
    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      },
      rightLimit: selectedItem.style.left + selectedItem.style.width - LIMIT.WIDTH,
      bottomLimit: selectedItem.style.top + selectedItem.style.height - LIMIT.HEIGHT
    });

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { direction, global: { selectedItem, workspaceState }, updateShapeList } = this.props;
    const { mousePos } = this.state;

    if (workspaceState !== WORKSPACE_STATES.IN_RESIZING) {
      return;
    }

    const currentPos = {
      x: e.clientX,
      y: e.clientY
    };

    selectedItem.style = this.resizeByDirection(direction, currentPos, mousePos, selectedItem.style);
    updateShapeList(selectedItem);

    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      }
    });
  };

  resizeByDirection = (direction, currentPos, lastPos, baseStyle) => {
    const { rightLimit, bottomLimit } = this.state;
    const diffX = currentPos.x - lastPos.x;
    const diffY = currentPos.y - lastPos.y;
    const deg = calculateAngle(
      { x: baseStyle.left + baseStyle.width / 2, y: baseStyle.top + baseStyle.height / 2 },
      { x: currentPos.x, y: currentPos.y }
    );

    const resizeStyle = {
      top: {
        top: judgeLimit(baseStyle.top + diffY, bottomLimit, "large"),
        height: judgeLimit(baseStyle.height - diffY, LIMIT.HEIGHT)
      },
      "top-left": {
        width: judgeLimit(baseStyle.width - diffX, LIMIT.WIDTH),
        height: judgeLimit(baseStyle.height - diffY, LIMIT.HEIGHT),
        left: judgeLimit(baseStyle.left + diffX, rightLimit, "large"),
        top: judgeLimit(baseStyle.top + diffY, bottomLimit, "large")
      },
      "top-right": {
        width: judgeLimit(baseStyle.width + diffX, LIMIT.WIDTH),
        height: judgeLimit(baseStyle.height - diffY, LIMIT.HEIGHT),
        top: judgeLimit(baseStyle.top + diffY, bottomLimit, "large")
      },
      left: {
        width: judgeLimit(baseStyle.width - diffX, LIMIT.WIDTH),
        left: judgeLimit(baseStyle.left + diffX, rightLimit, "large")
      },
      "bottom-left": {
        width: judgeLimit(baseStyle.width - diffX, LIMIT.WIDTH),
        height: judgeLimit(baseStyle.height + diffY, LIMIT.HEIGHT),
        left: judgeLimit(baseStyle.left + diffX, rightLimit, "large")
      },
      bottom: {
        height: judgeLimit(baseStyle.height + diffY, LIMIT.HEIGHT)
      },
      "bottom-right": {
        width: judgeLimit(baseStyle.width + diffX, LIMIT.WIDTH),
        height: judgeLimit(baseStyle.height + diffY, LIMIT.HEIGHT)
      },
      right: {
        width: judgeLimit(baseStyle.width + diffX, LIMIT.WIDTH)
      },
      rotate: {
        transform: `rotate(${deg}deg)`
      }
    };

    return {
      ...baseStyle,
      ...resizeStyle[direction]
    };
  };

  onMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { clearWorkspaceState } = this.props;
    clearWorkspaceState();

    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  };
}