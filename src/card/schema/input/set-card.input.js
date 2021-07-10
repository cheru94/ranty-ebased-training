const { InputValidation } = require('ebased/schema/inputValidation');

class SetCardValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'CLIENT.SET_CARD',
      specversion: 'v1.0.0',
      schema: {
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dni: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { SetCardValidation };
