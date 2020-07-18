export const buildMessage = (event: string, message: any | any[]) => {
  return `42${JSON.stringify([event, message])}`;
};

export const parseMessage = (message: string) => {
  const replaceData = message.replace(/42|0|40/, "");

  if (!replaceData) {
    return message;
  }

  const parseData = JSON.parse(message.replace(/42|0|40/, ""));

  if (!(parseData instanceof Array)) {
    return parseData;
  }

  const event = parseData[0];
  const data = parseData[1];
  return {
    event,
    data
  };
};
