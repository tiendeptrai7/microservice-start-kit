import { Repository, DataSource, getMetadataArgsStorage } from 'typeorm';
import { Users } from '../entities/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
}
