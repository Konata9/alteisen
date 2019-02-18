import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux/es/redux";
import { updateShapeList } from "../../stores/global/actions";

import Rect from "./BaseShape/Rect.js";
import Circle from "./BaseShape/Circle.js";

const shapeDictionary = {
  rect: Rect,
  circle: Circle
};

@connect(
  (state) => ({ global: state.global }),
  (dispatch) => ({
    updateShapeList: bindActionCreators(updateShapeList, dispatch)
  })
)
export default class EditableShape extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      mousePos: {
        x: 0,
        y: 0
      },
      isMoving: false,
      eleStyle: {},
      currentPos: {}
    };
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  render() {
    const { shape, position } = this.props;
    const RenderComponent = shapeDictionary[shape];
    const style = {
      ...this.state.eleStyle,
      ...position,
      ...this.state.currentPos
    };

    return (
      <div className={`editable-wrapper editable-${shape}`} style={style} ref={this.ref}>
        <RenderComponent/>
      </div>
    );
  }

  onMouseDown = (e) => {
    e.preventDefault();
    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      },
      isMoving: false
    });

    const ele = this.ref.current;
    ele.addEventListener("mousemove", this.onMouseMove);
  };

  onMouseMove = (e) => {
    e.preventDefault();
    const { mousePos } = this.state;
    const { position } = this.props;
    const [moveX, moveY] = [e.clientX - mousePos.x, e.clientY - mousePos.y];
    this.setState({
      currentPos: {
        left: position.left + moveX,
        top: position.top + moveY
      },
      isMoving: true
    });
  };

  onMouseUp = (e) => {
    e.preventDefault();
    const ele = this.ref.current;
    ele.removeEventListener("mousemove", this.onMouseMove);

    const { isMoving } = this.state;
    if (!isMoving) {
      return;
    }

    this.updateShapeList();
  };

  updateShapeList = () => {
    const { currentPos } = this.state;
    const { updateShapeList, id, global: { shapeList } } = this.props;
    const updatedList = shapeList.map(shape => {
      if (shape.id === id) {
        shape.position = {
          ...currentPos
        };
      }
      return shape;
    });

    updateShapeList(updatedList);

    this.setState({
      isMoving: false
    });
  };
}