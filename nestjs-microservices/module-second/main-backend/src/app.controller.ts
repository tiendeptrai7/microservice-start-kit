import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('moduleFirst')
  getHelloModuleFirst(): any {
    return this.appService.getHelloModuleFirst();

  }

  @Get('moduleSecond')
  getHelloModuleSecond(): any {
    return this.appService.getHelloModuleSecond();
  }

}
