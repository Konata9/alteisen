import React, { Component } from "react";
import "./baseShape.scss";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setWorkspaceState } from "../../../stores/global/actions";
import { WORKSPACE_STATES } from "../../../constants";

@connect(
  (state) => ({ global: state.global }),
  (dispatch) => ({
    setWorkspaceState: bindActionCreators(setWorkspaceState, dispatch)
  })
)
export default class RectItem extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      eleStyle: {}
    };
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("dblclick", this.onDbClick);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("dblclick", this.onDbClick);
  }

  render() {
    const { global: { workspaceState } } = this.props;

    return (
      <div className="shape rect" ref={this.ref} contentEditable={workspaceState === WORKSPACE_STATES.IN_EDITING}/>
    );
  }

  onDbClick = (e) => {
    e.preventDefault();
    const { setWorkspaceState } = this.props;
    setWorkspaceState(WORKSPACE_STATES.IN_EDITING);
  };
}
