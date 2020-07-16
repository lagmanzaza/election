export const buildMessage = (event: string, message: any | any[]) => {
  return `42${JSON.stringify([event, message])}`;
};

export const parseMessage = (message: string) => {
  const replaceData = 
  const parseData = JSON.parse(message.replace(/42|0|40/, ""));
  console.log(parseData);
  // const event = parseData[0];
  // const data = parseData.filter((val: string, index: number) => index > 0);
  // console.log(data);
  return message;
};
