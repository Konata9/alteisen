import React, { Component } from "react";
import dragSelectionWrapper from "./DragSelection/DragSelection";

const wrapperOptions = {
  targets: ".select-item",
  canvasStyle: {
    width: `800px`,
    height: `800px`
  }
};

@dragSelectionWrapper(wrapperOptions)
export default class Canvas extends Component {
  componentDidUpdate() {
    const { selectTargets } = this.props;
    console.log("update", selectTargets());
  }

  render() {
    return (
      <div style={{ width: "200px" }}>
        <p>Selection item</p>
        <ul>
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
