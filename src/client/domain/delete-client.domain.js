/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const {
  DeleteClientValidation,
} = require('../schema/input/delete-client.input');

const { deleteClientService } = require('../service/delete-client.service');

/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
const deleteClientDomain = async (commandPayload, commandMeta) => {
  new DeleteClientValidation(commandPayload, commandMeta);
  await deleteClientService(commandPayload);
  return {
    status: StatusCodes.OK,
    body: {
      message: 'Client deleted succesfully',
    },
  };
};

module.exports = { deleteClientDomain };
