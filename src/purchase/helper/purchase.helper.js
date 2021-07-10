/* eslint-disable indent */
const calculateProductCost = (paymentType, cost) => {
  let discount = 0;
  switch (paymentType) {
    case 'Gold':
      discount = (12 * cost) / 100;
      break;
    case 'Classic':
      discount = (8 * cost) / 100;
      break;
    default:
      break;
  }
  const discountedCost = cost - discount;
  return discountedCost;
};

const mappedProductDiscounts = (paymentType, products) => {
  let total = 0;
  const mappedProducts = products.map((product) => {
    const { cost } = product;
    const discountedCost = calculateProductCost(paymentType, cost);
    total += discountedCost;
    return { ...product, finalCost: discountedCost };
  });
  return { mappedProducts, total };
};

const buildPoints = (total) => {
  const points = Math.floor(total / 200);
  return points;
};

module.exports = { mappedProductDiscounts, buildPoints };
