/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { giftChoser } = require('../helper/gift.helper');
const { SetGiftValidation } = require('../schema/set-gift.input');
const { setGiftService } = require('../service/set-gift.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const setGiftDomain = async (eventPayload, eventMeta) => {
  // eslint-disable-next-line no-console
  try {
    // *****************************************************************
    // MOVE THIS TO THE HANDLER LAYER
    const { Message } = eventPayload;
    const message = JSON.parse(Message);
    // *****************************************************************
    new SetGiftValidation(message, eventMeta);
    const { birth, dni } = message;
    const chosenGift = giftChoser(birth);
    await setGiftService(dni, chosenGift);
    return {
      status: StatusCodes.OK,
      body: {
        message: 'Gift setted succesfully',
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.debug(error);
    return {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        message: error,
      },
    };
  }
};

module.exports = { setGiftDomain };
