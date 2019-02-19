import * as Types from "../actionTypes";

const initState = {
  workspaceState: null,
  dragItem: null,
  selectedItem: null,
  shapeList: [],
  assistLineList: [],
  topLayer: 100,
  selectedList: []
};

export default function common(state = initState, action) {
  const { type, workspaceState, dragItem, selectedItem, shapeList, assistLineList } = action;

  switch(type) {
    case Types.SET_DRAG_ITEM:
      return {
        ...state,
        dragItem
      };
    case Types.SET_SELECTED_ITEM:
    case Types.CLEAR_SELECTED_ITEM:
      return {
        ...state,
        selectedItem
      };
    case Types.APPEND_SHAPE_LIST:
    case Types.UPDATE_SHAPE_LIST:
    case Types.CLEAR_RESIZABLE_BORDER:
      return {
        ...state,
        shapeList
      };
    case Types.APPEND_ASSIST_LINE_LIST:
    case Types.CLEAR_ASSIST_LINE_LIST:
      return {
        ...state,
        assistLineList
      };
    case Types.SET_WORKSPACE_STATE:
    case Types.CLEAR_WORKSPACE_STATE:
      return {
        ...state,
        workspaceState
      };
    default:
      return state;
  }
}
