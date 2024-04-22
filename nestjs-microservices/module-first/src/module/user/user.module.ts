import { Logger, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersRepository } from '../../repositories/users.repository';
import { Users } from '../../entities/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheService } from '../redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, UsersRepository, Logger, RedisCacheService],
})
export class UserModule {}
