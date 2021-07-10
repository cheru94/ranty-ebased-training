const dynamoDB = require('ebased/service/storage/dynamo');

const updateClientService = async (commandPayload) => {
  const params = {
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.dni },
    ExpressionAttributeNames: {
      '#nm': 'name',
      '#bi': 'birth',
      '#lm': 'lastName',
    },
    ExpressionAttributeValues: {
      ':name': commandPayload.name,
      ':lastName': commandPayload.lastName,
      ':birth': commandPayload.birth,
    },
    UpdateExpression: 'SET #nm = :name, #lm = :lastName, #bi = :birth',
    RetunValues: 'ALL_NEW',
  };
  const dynamoResponse = await dynamoDB.updateItem(params);
  return dynamoResponse;
};

module.exports = { updateClientService };
