// drag & drop event utils
import { DRAG_ACTION } from "../constants";

export const dataTransferEncode = (e, data) => {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      e.dataTransfer.setData(key, JSON.stringify(data[key]));
    }
  }
};

export const dataTransferDecode = (e, keys) =>
  keys.map((key) => JSON.parse(e.dataTransfer.getData(key)));

export const generatorShapeId = (shape) => `${shape}-${+new Date()}`;

export const getMousePos = (e, action) => {
  if (action === DRAG_ACTION.COPY) {
    return {
      x: 0,
      y: 0
    };
  } else if (action === DRAG_ACTION.MOVE) {
    return {
      x: e.offsetX,
      y: e.offsetY
    };
  }
};