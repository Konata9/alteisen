// drag & drop event utils
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

export const createAssistLine = (type, position) => ({
  type: type,
  position: position
});

export const judgeLimit = (judge, limit, type = "small") => {
  if (type === "small") {
    return judge <= limit ? limit : judge;
  } else if (type === "large") {
    return judge >= limit ? limit : judge;
  }
};

export const calculateAngle = (center, currentPos) => {
  const angle = Math.atan2(currentPos.x - center.x, center.y - currentPos.y) / Math.PI * 180;
  return angle <= -90 ? (360 + angle) : angle;
};