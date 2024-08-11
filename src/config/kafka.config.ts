import { Transport, ClientOptions } from '@nestjs/microservices';

export const kafkaConfig: ClientOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'kafka-consumer-group',
    },
  },
};
