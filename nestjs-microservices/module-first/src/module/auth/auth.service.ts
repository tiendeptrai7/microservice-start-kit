import { Injectable, Logger } from '@nestjs/common';
import { RegisterInputDto } from '../user/dto/register.dto';
import { UserService } from '../user/user.service';
import { Users } from '../../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly logger: Logger,
  ) {}
  async register(registerInputDto: RegisterInputDto): Promise<Users> {
    try {
      return await this.userService.createUser(registerInputDto);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
