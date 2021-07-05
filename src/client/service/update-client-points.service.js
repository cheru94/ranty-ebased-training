const dynamoDB = require('ebased/service/storage/dynamo');

const updateClientPointService = async (commandPayload) => {
  const dynamoResponse = await dynamoDB.updateItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.dni },
    ExpressionAttributeNames: {
      '#p': 'points',
    },
    ExpressionAttributeValues: {
      ':p': commandPayload.points,
    },
    UpdateExpression: 'ADD #p = :p',
    RetunValues: 'UPDATED_CLIENT',
  });
  return dynamoResponse;
};

module.exports = { updateClientPointService };
