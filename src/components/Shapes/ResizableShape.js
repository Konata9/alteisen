import React, { Component } from "react";
import ResizableDot from "./ResizableDot.js";
import { DOT_DIRECTIONS } from "../../constants";

export default class ResizableShape extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      isClicked: false
    };
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("click", this.onClick);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("click", this.onClick);
  }

  render() {
    const { global: { selectedItem }, id } = this.props;

    return (
      <div className={`resizable-wrapper`} ref={this.ref}>
        {this.props.children}
        {
          selectedItem.id === id && (
            DOT_DIRECTIONS.map((direction, index) => <ResizableDot key={index} direction={direction} {...this.props}/>)
          )
        }
      </div>
    );
  }

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { global: { shapeList }, id, updateShapeList, setSelectedItem } = this.props;
    const targetShape = shapeList.find((shape) => shape.id === id);
    targetShape.style.border = "1px solid #298df8";

    setSelectedItem(targetShape);
    updateShapeList(targetShape);
  };
}