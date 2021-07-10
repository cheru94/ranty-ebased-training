/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');
const { getAllClientsService } = require('../service/getAll-clients.service');

/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
// eslint-disable-next-line no-unused-vars
const getAllClientDomain = async (commandPayload, commandMeta) => {
  const clients = await getAllClientsService(commandPayload);

  return {
    status: StatusCodes.OK,
    body: {
      message: clients,
    },
  };
};

module.exports = { getAllClientDomain };
