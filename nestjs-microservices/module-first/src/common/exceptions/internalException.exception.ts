import { BadRequestException } from '@nestjs/common';
import { MSG_SERVER_ERROR } from '../constants/message';
import { CODE_SERVER_ERROR } from '../constants/code';

export class InternalServerErrorException extends BadRequestException {
  constructor(message = MSG_SERVER_ERROR, error = CODE_SERVER_ERROR) {
    super(message, error);
  }
}
