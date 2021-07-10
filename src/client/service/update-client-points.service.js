const dynamoDB = require('ebased/service/storage/dynamo');

const updateClientPointService = async (commandPayload) => {
  const params = {
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.dni },
    ExpressionAttributeNames: {
      '#p': 'points',
    },
    ExpressionAttributeValues: {
      ':p': commandPayload.points,
    },
    UpdateExpression: 'SET #p = #p + :p',
    RetunValues: 'ALL_NEW',
  };
  // eslint-disable-next-line no-console
  console.debug(params);
  const dynamoResponse = await dynamoDB.updateItem(params);
  return dynamoResponse;
};

module.exports = { updateClientPointService };
