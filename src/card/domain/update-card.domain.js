/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { createCreditCardInfo } = require('../helper/card.helper');
const { UpdateCardValidation } = require('../schema/input/update-card.input');
const { updateCardService } = require('../service/update-card.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const updateCardDomain = async (eventPayload, eventMeta) => {
  // eslint-disable-next-line no-console
  try {
    // *****************************************************************
    // WHY MUST THIS BE MAPPED ?
    // shouldn't be a lib responsability ¿?
    // or im approaching wrong to the batchEventMapper ¿?
    const { Message } = eventPayload;
    const message = JSON.parse(Message);
    // *****************************************************************
    new UpdateCardValidation(message, eventMeta);
    const { creditCardNumber, expirationDate, securityCode, type } =
      createCreditCardInfo(message.birth);

    await updateCardService(
      message,
      creditCardNumber,
      expirationDate,
      securityCode,
      type
    );
    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Card Updated succesfully',
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

module.exports = { updateCardDomain };
