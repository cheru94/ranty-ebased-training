const dynamoDB = require('ebased/service/storage/dynamo');

const deleteClientService = async (commandPayload) => {
  const dynamoResponse = await dynamoDB.updateItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { ...commandPayload },
    UpdateExpression: 'set isActive = :isActive',
    ExpressionAttributeValues: {
      ':isActive': false,
    },
  });
  return dynamoResponse;
};

module.exports = { deleteClientService };
