import React, { Component } from "react";
import "./dragableItem.scss";
import { dataTransferEncode, generatorShapeId } from "../../utils";
import { DRAG_ACTION } from "../../constants";

class DragTargetWrapper extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      eleStyle: {}
    };
  }

  componentDidMount() {
    const { position = {} } = this.props;
    const domEle = this.ref.current;
    domEle.addEventListener("dragstart", this.onDragStart);
    domEle.addEventListener("dragend", this.onDragEnd);

    this.setState({
      eleStyle: {
        left: `${position.left}px`,
        top: `${position.top}px`
      }
    });
  }

  componentWillUnmount() {
    const domEle = this.ref.current;
    domEle.removeEventListener("dragstart", this.onDragStart);
    domEle.removeEventListener("dragend", this.onDragEnd);
  }

  render() {
    const { icon } = this.props;
    const { eleStyle } = this.state;

    return (
      <div
        className={`drag-target-wrapper ${icon ? "icon" : ""}`}
        ref={this.ref}
        draggable={true}
        style={eleStyle}
      >
        {this.props.children}
      </div>
    );
  }

  onDragStart = (e) => {
    const { options: { shape }, action, id = null } = this.props;

    this.setState({
      eleStyle: {
        ...this.state.eleStyle,
        opacity: 0.5
      }
    });
    dataTransferEncode(e, { id, shape, action });
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

const defaultOpts = {
  shape: null
};

export default function dragTarget(opts = defaultOpts) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return (WrappedComponent) => {
    return class DragComponent extends Component {
      render() {
        return (
          <DragTargetWrapper options={options} {...this.props}>
            <WrappedComponent {...this.props} />
          </DragTargetWrapper>
        );
      }
    };
  };
}
