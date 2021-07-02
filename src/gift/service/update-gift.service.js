const dynamoDB = require('ebased/service/storage/dynamo');

const updateGiftService = async (dni, chosenGift) => {
  const dbParams = {
    ExpressionAttributeNames: {
      '#G': 'gift',
    },
    ExpressionAttributeValues: {
      ':g': chosenGift,
    },
    Key: {
      dni,
    },
    ReturnValues: 'ALL_NEW',
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'SET #G = :g',
  };
  // eslint-disable-next-line no-console
  console.debug(dbParams);
  const dynamoResponse = await dynamoDB
    .updateItem(dbParams)
    // eslint-disable-next-line no-console
    .catch((e) => console.debug(e));
  // eslint-disable-next-line no-console
  console.debug(`Response:${dynamoResponse}`);
  console.debug(`SECOND:${dynamoResponse}`);
  return dynamoResponse;
};

module.exports = { updateGiftService };
