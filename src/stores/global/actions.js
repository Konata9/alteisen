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
  const {
    global: { shapeList }
  } = store.getState("global");
  console.log(shapeList);
  return {
    type: Types.APPEND_SHAPELIST,
    shapeList: [...shapeList, dragItem]
  };
};
