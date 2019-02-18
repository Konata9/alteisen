import * as Types from "../actionTypes";

const initState = {
  dragItem: null,
  selectedItem: null,
  shapeList: [],
  assistLineList: [],
  topLayer: 100,
  selectedList: []
};

export default function common(state = initState, action) {
  const { type, dragItem, shapeList, assistLineList } = action;

  switch (type) {
    case Types.SET_DRAG_ITEM:
      return {
        ...state,
        dragItem
      };
    case Types.APPEND_SHAPE_LIST:
    case Types.UPDATE_SHAPE_LIST:
      return {
        ...state,
        shapeList
      };
    case Types.APPEND_ASSIST_LINE_LIST:
      return {
        ...state,
        assistLineList
      };
    default:
      return state;
  }
}
