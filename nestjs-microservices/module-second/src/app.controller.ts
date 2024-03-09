import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_hello' })
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.appService.handleUserCreated(data);
  }
}
