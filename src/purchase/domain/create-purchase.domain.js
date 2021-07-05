/* eslint-disable no-new */
const { StatusCodes } = require('http-status-codes');

const { createPurchaseService } = require('../service/create-purchase.service');
const {
  CreatePurchaseValidation,
} = require('../schema/input/create-purchase.input');
const {
  ClientAcumulatedPointsValidation,
} = require('../schema/event/acumulated-points.event');
const {
  mappedProductDiscounts,
  buildPoints,
} = require('../helper/purchase.helper');
const {
  publishClientPointsService,
} = require('../service/publish-client-points.service');

/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
const createPurchaseDomain = async (commandPayload, commandMeta) => {
  new CreatePurchaseValidation(commandPayload, commandMeta);
  const { paymentType, products, dni } = commandPayload;
  const { mappedProducts, total } = mappedProductDiscounts(
    paymentType,
    products
  );
  await createPurchaseService(mappedProducts, total, dni);
  // eslint-disable-next-line no-use-before-define
  await validateThresholdPoints(commandPayload, commandMeta, total);

  return {
    statusCode: StatusCodes.OK,
    body: {
      message: 'Purchase added succesfully',
    },
  };
};

const validateThresholdPoints = async (commandPayload, commandMeta, total) => {
  if (total >= 200) {
    const points = buildPoints(total);
    await publishClientPointsService(
      new ClientAcumulatedPointsValidation(
        { points, ...commandPayload },
        commandMeta
      )
    );
  }
};

module.exports = { createPurchaseDomain };
