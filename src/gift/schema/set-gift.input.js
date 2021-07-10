const { InputValidation } = require('ebased/schema/inputValidation');

class SetGiftValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'CLIENT.SET_GIFT',
      specversion: 'v1.0.0',
      schema: {
        dni: { type: String, required: true },
        birth: { type: String, required: true },
        name: { type: String, required: false },
        lastName: { type: String, required: false },
      },
    });
  }
}

module.exports = { SetGiftValidation };
