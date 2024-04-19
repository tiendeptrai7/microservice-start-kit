import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';


async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  // microservice using TCP
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8876,
      retryAttempts: 5,
      retryDelay: 3000,
      host: '::',
    },
  });

  // rest api
  await app.listen(8875);

  await app.startAllMicroservices();

}
bootstrap();
