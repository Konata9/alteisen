import React, { Component } from "react";
import { WORKSPACE_STATES } from "../../constants";

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
    ele.addEventListener("mouseup", this.onMouseUp);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("mousedown", this.onMouseDown);
    ele.removeEventListener("mouseup", this.onMouseUp);
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
    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      }
    });

    console.log("dot down");

    const ele = this.ref.current;
    const { setWorkspaceState } = this.props;
    setWorkspaceState(WORKSPACE_STATES.IN_RESIZING);

    ele.addEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { direction, global: { selectedItem, workspaceState }, updateShapeList } = this.props;
    const { mousePos } = this.state;

    if(workspaceState !== WORKSPACE_STATES.IN_RESIZING) {
      return;
    }

    console.log("dot move");

    if(direction === "right") {
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
    // e.preventDefault();
    // e.stopPropagation();

    console.log("dot up");

    const { clearWorkspaceState } = this.props;
    clearWorkspaceState();

    ele.removeEventListener("mousemove", this.onMouseMove);
  };
}