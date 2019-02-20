import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux/es/redux";
import {
  updateShapeList,
  setSelectedItem,
  appendAssistLineList,
  clearAssistLineList,
  setWorkspaceState,
  clearWorkspaceState
} from "../../stores/global/actions";
import ResizableShape from "./ResizableShape.js";
import { createAssistLine } from "../../utils";
import { WORKSPACE_STATES } from "../../constants";

@connect(
  (state) => ({ global: state.global }),
  (dispatch) => ({
    updateShapeList: bindActionCreators(updateShapeList, dispatch),
    setSelectedItem: bindActionCreators(setSelectedItem, dispatch),
    appendAssistLineList: bindActionCreators(appendAssistLineList, dispatch),
    clearAssistLineList: bindActionCreators(clearAssistLineList, dispatch),
    setWorkspaceState: bindActionCreators(setWorkspaceState, dispatch),
    clearWorkspaceState: bindActionCreators(clearWorkspaceState, dispatch)
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
      currentPos: {}
    };
  }

  componentDidMount() {
    const ele = this.ref.current;
    ele.addEventListener("mousedown", this.onMouseDown);
  }

  componentWillUnmount() {
    const ele = this.ref.current;
    ele.removeEventListener("mousedown", this.onMouseDown);
  }

  render() {
    const { shape, style } = this.props;
    const { currentPos } = this.state;
    const displayStyle = {
      ...style,
      ...currentPos
    };

    return (
      <div className={`editable-wrapper editable-${shape}`} style={displayStyle} ref={this.ref}>
        <ResizableShape {...this.props}/>
      </div>
    );
  }

  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      mousePos: {
        x: e.clientX,
        y: e.clientY
      }
    });

    const { setWorkspaceState } = this.props;
    setWorkspaceState(WORKSPACE_STATES.IN_MOVING);

    const ele = this.ref.current;
    ele.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };

  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { mousePos } = this.state;
    const { style: { left, top }, global: { workspaceState } } = this.props;

    if (workspaceState !== WORKSPACE_STATES.IN_MOVING) {
      return;
    }

    const [moveX, moveY] = [e.clientX - mousePos.x, e.clientY - mousePos.y];
    this.setState({
      currentPos: {
        left: left + moveX,
        top: top + moveY
      }
    }, () => {
      this.appendAssistLineList(e.target);
    });
  };

  onMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { global: { workspaceState } } = this.props;
    const ele = this.ref.current;
    ele.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);

    if (workspaceState !== WORKSPACE_STATES.IN_MOVING) {
      return;
    }

    this.updateShapeList();
  };

  updateShapeList = () => {
    const { currentPos } = this.state;
    const { updateShapeList, clearAssistLineList, clearWorkspaceState, id, global: { shapeList } } = this.props;

    const targetShape = shapeList.find(shape => shape.id === id);
    targetShape.style = {
      ...targetShape.style,
      ...currentPos
    };

    updateShapeList(targetShape);
    clearAssistLineList();
    clearWorkspaceState();
    
    this.setState({
      currentPos: {}
    });
  };

  appendAssistLineList = (target) => {
    const { appendAssistLineList } = this.props;
    const { currentPos } = this.state;
    const assistLineList = [
      createAssistLine("horizon", { top: currentPos.top }),
      createAssistLine("horizon", { top: currentPos.top + target.clientHeight }),
      createAssistLine("vertical", { left: currentPos.left }),
      createAssistLine("vertical", { left: currentPos.left + target.clientWidth })
    ];
    appendAssistLineList(assistLineList);
  };

  // assistLineCheck = (basePos, comparePos, direction) => {
  //   const caseSelection = {
  //     top: () => (comparePos.top <= basePos.top && comparePos.top >= (basePos.top - COMPARE_RANGE)
  //     ),
  //     left: () => (comparePos.left <=)
  //   };
  //
  //   return caseSelection[direction]();
  // };
}