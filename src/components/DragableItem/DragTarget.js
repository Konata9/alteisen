import React, { Component } from "react";
import "./dragableItem.scss";
import { dataTransferEncode, generatorShapeId, getMousePos } from "../../utils";

class DragTargetWrapper extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      eleStyle: {}
    };
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
    const { eleStyle } = this.state;

    return (
      <div
        className="drag-target-wrapper"
        ref={this.ref}
        draggable={true}
        style={eleStyle}
      >
        {this.props.children}
      </div>
    );
  }

  onDragStart = (e) => {
    const { shape } = this.props;
    const id = generatorShapeId(shape);

    this.setState({
      eleStyle: {
        ...this.state.eleStyle,
        opacity: 0.3
      }
    });

    dataTransferEncode(e, { id, shape });
  };

  onDragEnd = (e) => {
    this.setState({
      eleStyle: {
        ...this.state.eleStyle,
        opacity: 1
      }
    });
  };
}

export default function dragTarget() {

  return (WrappedComponent) => {
    return class DragTarget extends Component {
      render() {
        return (
          <DragTargetWrapper {...this.props}>
            <WrappedComponent {...this.props} />
          </DragTargetWrapper>
        );
      }
    };
  };
}
