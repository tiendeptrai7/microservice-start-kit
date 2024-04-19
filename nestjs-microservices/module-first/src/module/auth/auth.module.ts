import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisCacheService } from '../redis/redis.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { UsersRepository } from '../../repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([]), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    Logger,
    RedisCacheService,
    UsersRepository,
    UserService,
  ],
})
export class AuthModule {}
