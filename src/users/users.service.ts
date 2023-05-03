import { Injectable } from '@nestjs/common';
import { User } from './entities/User';
import { users } from './users';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
  }
}
