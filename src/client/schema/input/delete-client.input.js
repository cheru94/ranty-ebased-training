const { InputValidation } = require('ebased/schema/inputValidation');

class DeleteClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      type: 'CLIENT.DELETE_CLIENT',
      specversion: 'v1.0.0',
      schema: {
        dni: { type: String, required: true },
      },
    });
  }
}

module.exports = { DeleteClientValidation };
