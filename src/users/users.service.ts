import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.interface';
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'john doe',
      password: 'change me',
    },
    {
      id: 2,
      username: 'user',
      password: 'change me',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
