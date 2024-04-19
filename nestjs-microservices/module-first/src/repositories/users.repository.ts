import { Repository, DataSource } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterInputDto } from '../module/user/dto/register.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async createUser(input: RegisterInputDto): Promise<Users> {
    // Hash password
    let password: string | null = null;
    if (input.password) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_PASSWORD));
      password = await bcrypt.hash(input.password, salt);
    }

    const row = this.create({
      email: input.email,
      password,
      roleId: 1,
      birthday: input?.birthday ?? null,
      gender: 1,
      userName: input.userName ?? null,
    });

    return await this.save(row);
  }
}
