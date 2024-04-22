import { NotAcceptableException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { UserDto } from './dto/user.dto';
import { RegisterInputDto } from './dto/register.dto';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UserService {
  private usersAlias: string;
  constructor(
    private userRepository: UsersRepository,
    private readonly logger: Logger,
  ) {
    this.usersAlias = Users.name;
  }
  async getUsers(): Promise<UserDto[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      this.logger.error(error);
    }
  }

  async createUser(input: RegisterInputDto): Promise<Users> {
    try {
    // Verify and validate email
    const userExist = await this.userRepository
      .createQueryBuilder(this.usersAlias)
      .select([
        `${this.usersAlias}.id as "id"`,
        `${this.usersAlias}.email as "email"`,
      ])
      .where(`${this.usersAlias}.email = :email`)
      .withDeleted()
      .setParameters({ email: input.email })
      .getRawOne();
      
      if (userExist) {
        throw new NotAcceptableException();
      }
  
      return await this.userRepository.createUser(input);

    } catch (error) {
      console.log(error)
      this.logger.error(error);
      throw new BadRequestException();
    }
  }
}
