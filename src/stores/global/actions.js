import store from "./../index";
import * as Types from "../actionTypes";
import { DEFAULT_STYLE } from "../../constants";

export const setDragItem = (dragItem) => {
  store.dispatch(appendShapeList(dragItem));

  return {
    type: Types.SET_DRAG_ITEM,
    dragItem
  };
};

export const setSelectedItem = (selectedItem) => {
  return {
    type: Types.SET_SELECTED_ITEM,
    selectedItem
  };
};

export const clearSelectedItem = () => {
  return {
    type: Types.CLEAR_SELECTED_ITEM,
    selectedItem: {}
  };
};

export const appendShapeList = (dragItem) => {
  const { global: { shapeList } } = store.getState("global");

  return {
    type: Types.APPEND_SHAPE_LIST,
    shapeList: [...shapeList, dragItem]
  };
};


export const updateShapeList = (dragItem) => {
  const { global: { shapeList } } = store.getState("global");
  const updatedList = shapeList.map((shape) => {
    if (shape.id === dragItem.id) {
      shape = dragItem;
    }
    return shape;
  });

  return {
    type: Types.UPDATE_SHAPE_LIST,
    shapeList: updatedList
  };
};

export const appendAssistLineList = (assistLineList) => {
  return {
    type: Types.APPEND_ASSIST_LINE_LIST,
    assistLineList
  };
};

export const clearAssistLineList = () => {
  return {
    type: Types.CLEAR_ASSIST_LINE_LIST,
    assistLineList: []
  };
};

export const clearResizableBorder = () => {
  const { global: { shapeList } } = store.getState("global");
  const updatedList = shapeList.map((shape) => {
    shape.style.border = DEFAULT_STYLE[shape.shape].border;
    return shape;
  });

  return {
    type: Types.CLEAR_RESIZABLE_BORDER,
    shapeList: updatedList
  };
};

export const switchSelectedState = (state) => {
  return {
    type: Types.SWITCH_SELECTED_STATE,
    hasSelected: state
  };
};