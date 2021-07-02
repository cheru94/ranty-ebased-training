const dynamoDB = require('ebased/service/storage/dynamo');

const getByIdClientService = async (commandPayload) => {
  const { dni } = commandPayload;
  const { Items } = await dynamoDB.queryTable({
    TableName: process.env.CLIENTS_TABLE,
    KeyConditionExpression: 'dni = :dni',
    ExpressionAttributeValues: {
      ':dni': dni,
    },
  });
  return Items;
};

module.exports = { getByIdClientService };
