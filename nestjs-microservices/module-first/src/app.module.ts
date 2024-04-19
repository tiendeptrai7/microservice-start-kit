import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './configs/mySql';
import dataSource from './configs/typeOrm.config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { UserModule } from './module/user/user.module';
import { UserController } from './module/user/user.controller';
import { UserService } from './module/user/user.service';
import { UsersRepository } from './repositories/users.repository';



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
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
