const { InputValidation } = require('ebased/schema/inputValidation');

class CreateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'CLIENT.CREATE_CLIENT',
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

module.exports = { CreateClientValidation };
