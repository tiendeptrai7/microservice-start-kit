import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8878,
      retryAttempts: 5,
      retryDelay: 3000,
      host: '::',
    },
  });
  await app.startAllMicroservices();
  await app.listen(8877);
}
bootstrap();
