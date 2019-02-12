import React, { Component } from "react";
import "./../scss/editWrapper.scss";

export default function editWrapper(WrappedComponent) {
  return class EditWrapper extends Component {
    constructor(props) {
      super(props);
      this.editWrapperStyle = {};
    }

    render() {
      return (
        <div className="edit-item-wrapper" style={this.editWrapperStyle}>
          In wrapper
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
}
