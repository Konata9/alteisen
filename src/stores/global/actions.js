import * as Types from "../actionTypes";

export const dropItem = (draggingItem) => {
  return {
    type: Types.DROP_ITEM,
    draggingItem
  };
};
