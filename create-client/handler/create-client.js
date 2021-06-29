/* eslint-disable no-use-before-define */
const { commandMapper } = require('ebased/handler');

const { inputMode } = require('ebased/handler/input/commandApi');
const { outputMode } = require('ebased/handler/output/commandApi');
const { createClientDomain } = require('../domain/create-client.domain');
/**
 *
 * @param {*} command
 * @param {*} context
 * @returns
 */
module.exports.handler = async (command, context) =>
  commandMapper(
    { command, context },
    inputMode,
    // eslint-disable-next-line no-use-before-define
    createClientDomain,
    outputMode
  );
