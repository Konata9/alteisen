// drag & drop event utils
export const dataTransferEncode = (e, data) => {
  for(const key in data) {
    if(data.hasOwnProperty(key)) {
      e.dataTransfer.setData(key, JSON.stringify(data[key]));
    }
  }
};

export const dataTransferDecode = (e, keys) => keys.map(key => JSON.parse(e.dataTransfer.getData(key)));

export const generatorShapeId = (shape, id) => `${shape}-${id}`;