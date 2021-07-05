/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');
const {
  UpdateClientPointsValidation,
} = require('../schema/input/update-client-points.input');
const {
  updateClientPointService,
} = require('../service/update-client-points.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const updateClientPointsDomain = async (eventPayload, eventMeta) => {
  // *****************************************************************
  // MOVE THIS TO THE HANDLER LAYER
  const { Message } = eventPayload;
  const message = JSON.parse(Message);
  // *****************************************************************
  new UpdateClientPointsValidation(message, eventMeta);
  await updateClientPointService(message);

  return {
    statusCode: StatusCodes.OK,
    body: {
      // eslint-disable-next-line quotes
      message: "Client point's updated succesfully",
    },
  };
};

module.exports = { updateClientPointsDomain };
