import React, { Component } from "react";

import RectItem from "./RectItem";

const shapeItem = {
  Rect: RectItem
};

export default class CopyShape extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { shape } = this.props;
    const CopyItem = shapeItem[shape];

    return <CopyItem {...this.props} />;
  }
}
