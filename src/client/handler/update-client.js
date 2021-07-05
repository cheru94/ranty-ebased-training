/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */

/**
 *
 * @param {*} command
 * @param {*} context
 * @returns
 */
module.exports.handler = async (command, context) => {
  const { mapper, input, inputMode, outputMode, domain } = analyzeHandler(
    command,
    context
  );
  return mapper(
    input,
    inputMode,
    // eslint-disable-next-line no-use-before-define
    domain,
    outputMode
  );
};
/**
 *
 * @param {*} command
 * @param {*} context
 * @returns
 */
const analyzeHandler = (command, context) => {
  let input;
  let mapper;
  let inputMode;
  let outputMode;
  let domain;
  if (!!command && !!command.httpMethod) {
    // API GATEWAY SCENARIO SYNC METHOD
    inputMode = require('ebased/handler/input/commandApi');
    outputMode = require('ebased/handler/output/commandApi');
    const { commandMapper } = require('ebased/handler');
    mapper = commandMapper;
    const { updateClientDomain } = require('../domain/update-client.domain');
    domain = updateClientDomain;
    input = { command, context };
  } else {
    // SQS WITH A SNS MESSAGE SCENARIO ASYNC METHOD
    inputMode = require('ebased/handler/input/batchEventQueue');
    outputMode = require('ebased/handler/output/batchEventConfirmation');
    const { batchEventMapper } = require('ebased/handler');
    mapper = batchEventMapper;
    const {
      updateClientPointsDomain,
    } = require('../domain/update-client-points-domain');
    domain = updateClientPointsDomain;
    // events = mapEvent(command);
    events = command;
    input = { events, context };
  }
  return { mapper, input, inputMode, outputMode, domain };
};

const mapEvent = (events) => {
  const mappedEvent = events.map((event) => ({
    ...event,
    ...event.body,
  }));
  return {};
};
