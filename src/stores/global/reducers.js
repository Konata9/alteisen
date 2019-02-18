import * as Types from "../actionTypes";

const initState = {
  dragItem: null,
  selectedItem: null,
  shapeList: [],
  topLayer: 100,
  selectedList: []
};

export default function common(state = initState, action) {
  const { type, dragItem, shapeList } = action;

  switch(type) {
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
    default:
      return state;
  }
}
