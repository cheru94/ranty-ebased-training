/* eslint-disable no-use-before-define */
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

const {
  invokeClientByIdService,
} = require('../service/invoke-clientById.service');
/**
 *
 * @param {*} commandPayload
 * @param {*} commandMeta
 * @returns
 */
const createPurchaseDomain = async (commandPayload, commandMeta) => {
  new CreatePurchaseValidation(commandPayload, commandMeta);
  const { paymentType, products, dni } = commandPayload;
  const isActive = await isClientActive(dni, commandMeta);
  if (!isActive) {
    return {
      status: StatusCodes.NOT_FOUND,
      body: {
        message: 'Active client not found',
      },
    };
  }
  const { mappedProducts, total } = mappedProductDiscounts(
    paymentType,
    products
  );
  await createPurchaseService(mappedProducts, total, dni);
  await validateThresholdPoints(commandPayload, commandMeta, total);

  return {
    status: StatusCodes.OK,
    body: {
      message: 'Purchase added succesfully',
    },
  };
};
const isClientActive = async (dni, commandMeta) => {
  const { isActive } = await invokeClientByIdService(dni, commandMeta);
  return isActive;
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
