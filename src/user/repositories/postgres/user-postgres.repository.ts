import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../interfaces/IUserRepository';
import { TenantProvider } from 'src/tenant/tenant.provider';

@Injectable()
export class UserPostgresRepository implements IUserRepository {
    constructor(
        private tenantProvider: TenantProvider,
        private userRepository: Repository<User>,
      ) {
        const dataSource = this.tenantProvider.getDataSource()
        this.userRepository =  dataSource.getRepository(User);
      }
    

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
