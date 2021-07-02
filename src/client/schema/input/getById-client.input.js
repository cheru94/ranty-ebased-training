const { InputValidation } = require('ebased/schema/inputValidation');

class GetByIdClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'CLIENT.GET_BY_ID_CLIENT',
      specversion: 'v1.0.0',
      schema: {
        dni: { type: String, required: true },
      },
    });
  }
}

module.exports = { GetByIdClientValidation };
