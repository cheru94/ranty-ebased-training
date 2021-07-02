/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');
const { getByIdClientService } = require('../service/getById-client.service');

/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
// eslint-disable-next-line no-unused-vars
const getByIdClientDomain = async (commandPayload, commandMeta) => {
  const clients = await getByIdClientService(commandPayload);

  return {
    statusCode: StatusCodes.OK,
    body: {
      message: clients,
    },
  };
};

module.exports = { getByIdClientDomain };
