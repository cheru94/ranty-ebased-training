/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { createCreditCardInfo } = require('../helper/card.helper');
const { SetCardValidation } = require('../schema/input/set-card.input');
const { setCardService } = require('../service/set-card.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const setCardDomain = async (eventPayload, eventMeta) => {
  // eslint-disable-next-line no-console
  try {
    // *****************************************************************
    // WHY MUST THIS BE MAPPED ?
    // shouldn't be a lib responsability ¿?
    // or im approaching wrong to the batchEventMapper ¿?
    const { Message } = eventPayload;
    const message = JSON.parse(Message);
    // *****************************************************************
    new SetCardValidation(message, eventMeta);
    const { creditCardNumber, expirationDate, securityCode, type } =
      createCreditCardInfo(message.birth);

    await setCardService(
      message,
      creditCardNumber,
      expirationDate,
      securityCode,
      type
    );
    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Card setted succesfully',
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

module.exports = { setCardDomain };
