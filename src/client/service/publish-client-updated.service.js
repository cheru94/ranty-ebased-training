const sns = require('ebased/service/downstream/sns');

async function publishUpdatedClientService(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  const snsPublishParams = {
    TopicArn: process.env.CLIENTS_UPDATED_TOPIC,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { publishUpdatedClientService };
