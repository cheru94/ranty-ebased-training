const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientAcumulatedPointsValidation extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.ACUMULATED_POINTS',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: false,
        dni: { type: String, required: true },
        points: { type: Number, required: true },
      },
    });
  }
}

module.exports = { ClientAcumulatedPointsValidation };
