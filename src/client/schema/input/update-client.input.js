const { InputValidation } = require('ebased/schema/inputValidation');

class UpdateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'CLIENT.UPDATE_CLIENT',
      specversion: 'v1.0.0',
      schema: {
        dni: { type: String, required: true },
        name: { type: String, required: false },
        lastName: { type: String, required: false },
        birth: { type: String, required: false },
        creditCard: { type: Object, required: false },
      },
    });
  }
}

module.exports = { UpdateClientValidation };
