import React, { Component } from "react";
import dragSelectionWrapper from "./../containers/DragSelection";

const wrapperOptions = {
  captureTarget: ".select-item",
  canvasStyle: {
    width: `800px`,
    height: `800px`
  }
};

@dragSelectionWrapper(wrapperOptions)
export default class Canvas extends Component {
  render() {
    const { selectTargets } = this.props;
    console.log(selectTargets());

    return (
      <div>
        <p>Selection item</p>
        <ul style={{ width: "200px" }}>
          <li className="select-item">Item 1</li>
          <li className="select-item">Item 2</li>
          <li className="select-item">Item 3</li>
          <li className="select-item">Item 4</li>
          <li className="select-item">Item 5</li>
          <li className="select-item">Item 6</li>
          <li className="select-item">Item 7</li>
          <li className="select-item">Item 8</li>
        </ul>
      </div>
    );
  }
}
