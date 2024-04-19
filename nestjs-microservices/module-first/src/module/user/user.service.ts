import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UsersRepository,
    private readonly logger: Logger,
  ) {}
  async getUsers(): Promise<UserDto[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
