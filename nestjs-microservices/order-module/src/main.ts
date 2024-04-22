import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  // microservice using RMQ
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'orders-queue',
    },
  });

  // rest api
  await app.listen(8888);

  await app.startAllMicroservices();
}

bootstrap();
