/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { calculateAge } = require('../helper/client.helper');
const {
  CreateClientValidation,
} = require('../schema/input/create-client.input');
const {
  ClientCreatedValidation,
} = require('../schema/event/client-created.event');
const { createClientService } = require('../service/create-client.service');
const {
  publishCreatedClientService,
} = require('../service/publish-client-created.service');

/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
const createClientDomain = async (commandPayload, commandMeta) => {
  new CreateClientValidation(commandPayload, commandMeta);
  if (
    calculateAge(commandPayload.birth) < 18 ||
    calculateAge(commandPayload.birth) > 65
  ) {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: {
        message: 'Client must be under 65 years old',
      },
    };
  }
  await Promise.all([
    createClientService(commandPayload),
    publishCreatedClientService(
      new ClientCreatedValidation(commandPayload, commandMeta)
    ),
  ]);
  return {
    statusCode: 200,
    body: {
      message: 'Client added succesfully',
    },
  };
};

module.exports = { createClientDomain };
