import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('MODULE_SECOND') private readonly communicationClient: ClientProxy,
    @Inject('MODULE_FIRST') private readonly analyticsClient: ClientProxy,
  ) {}

  getHelloModuleFirst(): any {
    return this.analyticsClient.send({ cmd: 'get_hello' }, {});
  }

  getHelloModuleSecond(): any {
    return this.communicationClient.send({ cmd: 'get_hello' }, {});
  }
  
}
