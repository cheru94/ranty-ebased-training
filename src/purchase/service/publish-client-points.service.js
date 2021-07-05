const sns = require('ebased/service/downstream/sns');

const publishClientPointsService = async (clientUpdatedEvent) => {
  const { eventPayload, eventMeta } = clientUpdatedEvent.get();

  const snsPublishParams = {
    TopicArn: process.env.AMOUNT_REACHED_TOPIC,
    Message: { ...eventPayload },
  };
  await sns.publish(snsPublishParams, eventMeta);
};

module.exports = { publishClientPointsService };
