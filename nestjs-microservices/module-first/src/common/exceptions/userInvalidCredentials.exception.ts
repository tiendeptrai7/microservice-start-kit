import { BadRequestException } from '@nestjs/common';
import { MSG_INVALID_CREDENTIALS } from '../constants/message';
import { CODE_INVALID_CREDENTIALS } from '../constants/code';

export class UserInvalidCredentialsException extends BadRequestException {
  constructor(message = MSG_INVALID_CREDENTIALS, error = CODE_INVALID_CREDENTIALS) {
    super(message, error);
  }
}
