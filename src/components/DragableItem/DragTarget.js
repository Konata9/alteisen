import React, { Component } from "react";
import { connect } from "react-redux";
import { dropItem } from "../../stores/global/actions";
import { bindActionCreators } from "redux";

const defaultOpts = {};

@connect(
  (state) => ({ global: state.global }),
  (dispatch) => ({ dropItem: bindActionCreators(dropItem, dispatch) })
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
    const { dropItem } = this.props;
    console.log(this);
    dropItem([this]);
    e.target.style.opacity = 0.5;
    console.log("start");
    console.log(e.dataTransfer);
  };

  onDragEnd = (e) => {
    e.target.style.opacity = "";
    console.log("end");
  };
}

export default function dragTarget(opts = defaultOpts) {
  return (WrappedComponent) => {
    return class DragTarget extends Component {
      render() {
        return (
          <DragEnhancer {...opts}>
            <WrappedComponent {...this.props} />
          </DragEnhancer>
        );
      }
    };
  };
}
