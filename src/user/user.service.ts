
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IUserRepository } from './repositories/interfaces/IUserRepository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(userData: Partial<User>): Promise<User> {
    return this.userRepository.create(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
