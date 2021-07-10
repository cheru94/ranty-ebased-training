const dynamoDB = require('ebased/service/storage/dynamo');

const createPurchaseService = async (mappedProducts, total, dni) => {
  const dynamoResponse = await dynamoDB.putItem({
    TableName: process.env.PURCHASE_TABLE,
    Item: {
      dni,
      timestamp: new Date().toISOString(),
      products: mappedProducts,
      finalAmount: total,
    },
  });
  return dynamoResponse;
};

module.exports = { createPurchaseService };
