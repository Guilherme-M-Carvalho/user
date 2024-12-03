import { Injectable } from '@nestjs/common';
import { ConnectionService } from './database/connection.service';
import { Repository } from 'typeorm';
import { User } from './user/entities/user.entity';
import { TenantProvider } from './tenant/tenant.provider';

@Injectable()
export class AppService {
  constructor(
    private readonly tenantProvider: TenantProvider
  ) {}

  async find(tenantId: string) {
    const connection = this.tenantProvider.getDataSource();
    
    const userRepository: Repository<User> = connection.getRepository(User);

    const users = await userRepository.find();

    return{teste: `Processado para o tenant ${tenantId}`, users};
  }
}
