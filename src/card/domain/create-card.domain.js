/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { createCreditCardInfo } = require('../helper/card.helper');
const { CreateCardValidation } = require('../schema/input/create-card.input');
const { createCardService } = require('../service/create-card.service');

/**
 *
 * @param {*} eventPayload
 * @param {*} eventMeta
 * @returns
 */
const createCardDomain = async (eventPayload, eventMeta) => {
  // eslint-disable-next-line no-console
  try {
    // *****************************************************************
    // WHY MUST THIS BE MAPPED ?
    // shouldn't be a lib responsability ¿?
    // or im approaching wrong to the batchEventMapper ¿?
    const { Message } = eventPayload;
    const message = JSON.parse(Message);
    // *****************************************************************
    new CreateCardValidation(message, eventMeta);
    const { creditCardNumber, expirationDate, securityCode, type } =
      createCreditCardInfo(message.birth);

    await createCardService(
      message,
      creditCardNumber,
      expirationDate,
      securityCode,
      type
    );
    return {
      statusCode: StatusCodes.OK,
      body: {
        message: 'Card added succesfully',
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

module.exports = { createCardDomain };
