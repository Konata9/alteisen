import store from "./../index";
import * as Types from "../actionTypes";
import { DRAG_ACTION } from "../../constants";

export const setDragItem = (dragItem) => {
  const { action } = dragItem;
  if(action === DRAG_ACTION.COPY) {
    store.dispatch(appendShapeList(dragItem));
  }

  return {
    type: Types.SET_DRAG_ITEM,
    dragItem
  };
};

export const appendShapeList = (dragItem) => {
  const {
    global: { itemList }
  } = store.getState("global");

  return {
    type: Types.APPEND_SHAPELIST,
    itemList: [...itemList, dragItem]
  };
};
