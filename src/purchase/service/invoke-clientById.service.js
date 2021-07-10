const lambda = require('ebased/service/downstream/lambda');

const invokeClientByIdService = async (dni, commandMeta) => {
  const invokeParams = {
    FunctionName: process.env.GET_CLIENT_BY_ID_LAMBDA_NAME,
    Payload: { dni },
  };
  const { body } = await lambda.invoke(invokeParams, commandMeta);
  const { message } = JSON.parse(body);
  const [client = { isActive: false }] = message;
  return client;
};

module.exports = { invokeClientByIdService };
