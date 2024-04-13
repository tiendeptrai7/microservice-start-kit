import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MODULE_FIRST',
        transport: Transport.TCP,
        options: { port: 8876, host: 'module-first' },
      },
      {
        name: 'MODULE_SECOND',
        transport: Transport.TCP,
        options: { port: 8878, host: 'module-second' },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
