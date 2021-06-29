const dynamoDB = require('ebased/service/storage/dynamo');

const createClientService = async (commandPayload) => {
  const dynamoResponse = await dynamoDB.putItem({
    TableName: process.env.CLIENTS_TABLE,
    Item: commandPayload,
  });
  return dynamoResponse;
};

module.exports = { createClientService };
