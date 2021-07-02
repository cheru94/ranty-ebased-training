/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { giftChoser } = require('../helper/gift.helper');
const { CreateGiftValidation } = require('../schema/create-gift.input');
const { createGiftService } = require('../service/create-gift.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const createGiftDomain = async (eventPayload, eventMeta) => {
  // eslint-disable-next-line no-console
  try {
    // *****************************************************************
    // WHY MUST THIS BE MAPPED ?
    // shouldn't be a lib responsability ¿?
    // or im approaching wrong to the batchEventMapper  component of eBased ¿?
    const { Message } = eventPayload;
    const message = JSON.parse(Message);
    // *****************************************************************
    new CreateGiftValidation(message, eventMeta);
    const { birth, dni } = message;
    const chosenGift = giftChoser(birth);
    await createGiftService(dni, chosenGift);
    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Gift added succesfully',
      },
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.debug(error);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      body: {
        message: error,
      },
    };
  }
};

module.exports = { createGiftDomain };
