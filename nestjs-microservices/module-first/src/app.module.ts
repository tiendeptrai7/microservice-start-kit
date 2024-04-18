import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/mySql';
import dataSource from './configs/typeOrm.config';
import { addTransactionalDataSource } from 'typeorm-transactional';



@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dbConfig;
      },
      async dataSourceFactory() {
        if (!dataSource) {
          throw new Error('Invalid dataSource options passed');
        }
        return addTransactionalDataSource(dataSource);
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
