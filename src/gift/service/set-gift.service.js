const dynamoDB = require('ebased/service/storage/dynamo');

const setGiftService = async (dni, chosenGift = 'Sweater') => {
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
  console.debug(dbParams);
  const dynamoResponse = await dynamoDB.updateItem(dbParams);
  return dynamoResponse;
};

module.exports = { setGiftService };
