const sns = require('ebased/service/downstream/sns');

async function publishCreatedClientService(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  const snsPublishParams = {
    TopicArn: process.env.CLIENTS_CREATED_TOPIC,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { publishCreatedClientService };
