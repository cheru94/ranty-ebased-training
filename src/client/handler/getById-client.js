/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
const { commandMapper } = require('ebased/handler');

const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');
const { getByIdClientDomain } = require('../domain/getById-client.domain');
/**
 *
 * @param {*} command
 * @param {*} context
 * @returns
 */
module.exports.handler = async (command, context) => {
  const { inputMode, outputMode } = analyzeIO(command);
  return commandMapper(
    { command, context },
    inputMode,
    // eslint-disable-next-line no-use-before-define
    getByIdClientDomain,
    outputMode
  );
};

const analyzeIO = (command) => {
  let inputMode;
  let outPutMode;
  if (!!command && !!command.httpMethod) {
    inputMode = require('ebased/handler/input/commandApi');
    outPutMode = require('ebased/handler/output/commandApi');
  } else {
    inputMode = require('ebased/handler/input/commandInvoke');
    outPutMode = require('ebased/handler/output/commandInvoke');
  }
  return { inputMode, outputMode };
};
