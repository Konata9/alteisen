import React, { Component } from "react";
import "./componentsbar.scss";

import { DRAG_ACTION } from "../../constants/index";
import RectItem from "../../components/Shapes/RectItem";

export default class Componentsbar extends Component {
  render() {
    return (
      <div className="componentsbar-wrapper">
        <RectItem icon={true} action={DRAG_ACTION.COPY} />
      </div>
    );
  }
}
