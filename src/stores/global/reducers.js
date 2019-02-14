import * as Types from "../actionTypes";

const initState = {
  draggingItem: [],
  selectedItem: null,
  topLayer: 100,
  selectedList: []
};

export default function common(state = initState, action) {
  const { type, draggingItem } = action;

  switch (type) {
    case Types.DROP_ITEM:
      return {
        ...state,
        draggingItem
      };
    default:
      return state;
  }
}
