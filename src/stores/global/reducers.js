import * as Types from "../actionTypes";

const initState = {
  dragItem: null,
  itemList: [],
  topLayer: 100,
  selectedList: []
};

export default function common(state = initState, action) {
  const { type, dragItem, itemList } = action;

  switch (type) {
    case Types.SET_DRAG_ITEM:
      return {
        ...state,
        dragItem
      };
    case Types.APPEND_SHAPELIST:
      return {
        ...state,
        itemList
      };
    default:
      return state;
  }
}
