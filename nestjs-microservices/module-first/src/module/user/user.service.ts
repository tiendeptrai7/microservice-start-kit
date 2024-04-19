import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../repositories/users.repository';
import { Users } from '../../entities/users.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UsersRepository) {}
  async getUsers(): Promise<Users[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.log('getUsers',error)
    }
   
  }
}
