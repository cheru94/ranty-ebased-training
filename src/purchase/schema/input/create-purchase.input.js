const { InputValidation } = require('ebased/schema/inputValidation');

class CreatePurchaseValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'PURCHASE.CREATE_PURCHASE',
      specversion: 'v1.0.0',
      schema: {
        dni: { type: String, required: true },
        paymentType: { type: String, required: true },
        products: { type: Array, required: true },
      },
    });
  }
}

module.exports = { CreatePurchaseValidation };
