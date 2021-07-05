/* eslint-disable no-use-before-define */
const { batchEventMapper } = require('ebased/handler');

const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');
const { setCardDomain } = require('../domain/set-card.domain');
/**
 *
 * @param {*} command
 * @param {*} context
 * @returns
 */
module.exports.handler = async (events, context) =>
  batchEventMapper(
    { events, context },
    inputMode,
    // eslint-disable-next-line no-use-before-define
    setCardDomain,
    outputMode
  );
