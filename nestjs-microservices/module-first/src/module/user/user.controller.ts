import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Users } from '../../entities/users.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'get_hello' })
  @Get()
  getUsers(): Promise<any[]> {
    return this.userService.getUsers();
  }
}
