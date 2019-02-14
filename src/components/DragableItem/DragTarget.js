import React, { Component } from "react";
import { connect } from "react-redux";
import { setDragItem } from "../../stores/global/actions";
import { bindActionCreators } from "redux";

@connect(
  (state) => ({ global: state.global }),
  (dispatch) => ({ setDragItem: bindActionCreators(setDragItem, dispatch) })
)
class DragEnhancer extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
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
    return (
      <div ref={this.ref} draggable={true} className="drag-target-wrapper">
        {this.props.children}
      </div>
    );
  }

  onDragStart = (e) => {
    e.target.style.opacity = 0.5;
  };

  onDragEnd = (e) => {
    console.log("drag end");
    console.log(e);
    const { type, setDragItem } = this.props;
    e.target.style.opacity = "";

    const dragItem = {
      type: type,
      dropPos: {
        x: e.clientX,
        y: e.clientY
      }
    };

    setDragItem(dragItem);
  };
}

const defaultOpts = {};

export default function dragTarget(opts = defaultOpts) {
  const options = {
    ...defaultOpts,
    ...opts
  };

  return (WrappedComponent) => {
    return class DragTarget extends Component {
      render() {
        return (
          <DragEnhancer {...options}>
            <WrappedComponent {...this.props} />
          </DragEnhancer>
        );
      }
    };
  };
}
