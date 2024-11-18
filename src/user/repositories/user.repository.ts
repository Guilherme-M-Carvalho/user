import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUserRepository } from './interfaces/IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
      ) {}
    

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({where: {id: id}});
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
