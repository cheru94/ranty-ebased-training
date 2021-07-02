/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');
const { isClientsAgeInRange } = require('../helper/client.helper');
const {
  UpdateClientValidation,
} = require('../schema/input/update-client.input');
const {
  ClientUpdatedValidation,
} = require('../schema/event/client-updated.event');
const { updateClientService } = require('../service/update-client.service');
const {
  publishUpdatedClientService,
} = require('../service/publish-client-updated.service');
/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
const updateClientDomain = async (commandPayload, commandMeta) => {
  new UpdateClientValidation(commandPayload, commandMeta);
  // guard pattern
  if (!isClientsAgeInRange(commandPayload.birth)) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: {
        message: 'Client must be under 65 years old',
      },
    };
  }
  await updateClientService(commandPayload);
  await publishUpdatedClientService(
    new ClientUpdatedValidation(commandPayload, commandMeta)
  );
  return {
    statusCode: StatusCodes.OK,
    body: {
      message: 'Client updated succesfully',
    },
  };
};

module.exports = { updateClientDomain };
