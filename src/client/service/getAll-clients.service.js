const dynamoDB = require('ebased/service/storage/dynamo');

const getAllClientsService = async (commandPayload) => {
  const { Items } = await dynamoDB.scanTable({
    TableName: process.env.CLIENTS_TABLE,
  });
  return Items;
};

module.exports = { getAllClientsService };
