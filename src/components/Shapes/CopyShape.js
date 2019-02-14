import React, { Component } from "react";

export default class CopyShape extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props;
    const ShapeItem = `${type}Item`;

    return <ShapeItem {...this.props} />;
  }
}
