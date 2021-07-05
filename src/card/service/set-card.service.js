const dynamoDB = require('ebased/service/storage/dynamo');

const setCardService = async (
  eventPayload,
  creditCardNumber,
  expirationDate,
  securityCode,
  type
) => {
  const dbParams = {
    ExpressionAttributeNames: {
      '#C': 'creditCard',
    },
    ExpressionAttributeValues: {
      ':c': {
        number: creditCardNumber,
        expiration: expirationDate,
        ccv: securityCode,
        type,
      },
    },
    Key: {
      dni: eventPayload.dni,
    },
    ReturnValues: 'ALL_NEW',
    TableName: process.env.CLIENTS_TABLE,
    UpdateExpression: 'SET #C = :c',
  };
  // eslint-disable-next-line no-console
  console.debug(dbParams);
  const dynamoResponse = await dynamoDB.updateItem(dbParams);
  return dynamoResponse;
};

module.exports = { setCardService };
