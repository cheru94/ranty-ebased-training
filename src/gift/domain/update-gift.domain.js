/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { giftChoser } = require('../helper/gift.helper');
const { UpdateGiftValidation } = require('../schema/update-gift.input');
const { updateGiftService } = require('../service/update-gift.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const updateGiftDomain = async (eventPayload, eventMeta) => {
  // eslint-disable-next-line no-console
  try {
    // *****************************************************************
    // WHY MUST THIS BE MAPPED ?
    // shouldn't be a lib responsability ¿?
    // or im approaching wrong to the batchEventMapper  component of eBased ¿?
    const { Message } = eventPayload;
    const message = JSON.parse(Message);
    // *****************************************************************
    new UpdateGiftValidation(message, eventMeta);
    const { birth, dni } = message;
    const chosenGift = giftChoser(birth);
    await updateGiftService(dni, chosenGift);
    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Gift Updated succesfully',
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

module.exports = { updateGiftDomain };
