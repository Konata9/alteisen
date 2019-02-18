import store from "./../index";
import * as Types from "../actionTypes";

export const setDragItem = (dragItem) => {
  store.dispatch(appendShapeList(dragItem));

  return {
    type: Types.SET_DRAG_ITEM,
    dragItem
  };
};

export const appendShapeList = (dragItem) => {
  const { global: { shapeList } } = store.getState("global");

  return {
    type: Types.APPEND_SHAPE_LIST,
    shapeList: [...shapeList, dragItem]
  };
};


export const updateShapeList = (shapeList) => {
  return {
    type: Types.UPDATE_SHAPE_LIST,
    shapeList
  }
};