import React, { Component } from "react";
import { Link } from "react-router-dom";

import avatar from "./../assets/avatar.png";

export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="content-wrapper">
        <div className="avatar">
          <img src={avatar} alt="kizunaai" />
        </div>
        <nav>
          <ul className="link-list">
            <li>
              <Link to="/studio">JS 框选功能</Link>
            </li>
          </ul>
        </nav>
        {children}
      </div>
    );
  }
}
