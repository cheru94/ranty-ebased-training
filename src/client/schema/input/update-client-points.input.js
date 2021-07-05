const { InputValidation } = require('ebased/schema/inputValidation');

class UpdateClientPointsValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      source: meta.source,
      payload,
      meta,
      type: 'CLIENT.UPDATE_CLIENT_POINTS',
      specversion: 'v1.0.0',
      schema: {
        strict: false,
        dni: { type: String, required: true },
        points: { type: Number, required: true },
      },
    });
  }
}

module.exports = { UpdateClientPointsValidation };
