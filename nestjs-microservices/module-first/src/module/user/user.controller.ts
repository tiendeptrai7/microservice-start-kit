import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @MessagePattern({ cmd: 'get_hello' })
  @Get('moduleFirst')
  getHello(): string {
    return this.appService.getHello();
  }
}
