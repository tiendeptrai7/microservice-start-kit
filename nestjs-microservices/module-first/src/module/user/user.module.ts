import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersRepository } from '../../repositories/users.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
})
export class UserModule {}
