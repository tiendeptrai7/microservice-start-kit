import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class AppService {
  private readonly users: any[] = [];

  constructor(
    @Inject('MODULE_SECOND') private readonly communicationClient: ClientProxy,
    @Inject('MODULE_FIRST') private readonly analyticsClient: ClientProxy,
    @Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  getHelloModuleFirst(): any {
    return this.analyticsClient.send({ cmd: 'get_hello' }, {});
  }

  getHelloModuleSecond(): any {
    return this.communicationClient.send({ cmd: 'get_hello' }, {});
  }

  placeOrder(order: any) {
    this.rabbitClient.emit('order-placed', order);

    return { message: 'Order Placed!' };
  }

  getOrders() {
    return this.rabbitClient
      .send({ cmd: 'fetch-orders' }, {})
      .pipe(timeout(5000));
  }
}
