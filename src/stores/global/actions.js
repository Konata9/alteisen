import store from "./../index";
import * as Types from "../actionTypes";
import { DRAG_ACTION } from "../../constants";

export const setDragItem = (dragItem) => {
  const { action } = dragItem;
  const { global: { itemList } } = store.getState("global");

  if(action === DRAG_ACTION.COPY) {
    dragItem.id = itemList.length;
    dragItem.action = DRAG_ACTION.MOVE;
    store.dispatch(appendShapeList(dragItem));
  } else if(action === DRAG_ACTION.MOVE) {
    store.dispatch(updateShapeList(dragItem));
  }

  return {
    type: Types.SET_DRAG_ITEM,
    dragItem
  };
};

export const appendShapeList = (dragItem) => {
  const { global: { itemList } } = store.getState("global");

  return {
    type: Types.APPEND_SHAPELIST,
    itemList: [...itemList, dragItem]
  };
};

export const updateShapeList = (dragItem) => {
  const { global: { itemList } } = store.getState("global");

  const target = itemList.find(item => item.id === dragItem.id);
  target.position = dragItem.position;

  return {
    type: Types.UPDEATE_ITEMLIST,
    itemList: [...itemList]
  };
};
