import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserRepository } from './repositories/interfaces/IUserRepository';
import { RedisService } from 'src/config/redis';
import { UserRedisCacheRepository } from './repositories/cache/user-redis.repository';
import { UserPostgresRepository } from './repositories/postgres/user-postgres.repository';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantProvider } from 'src/tenant/tenant.provider';

@Module({
    imports: [TenantModule],
    controllers: [UserController],
    providers: [
      UserService,
      RedisService,
      {provide: IUserRepository, useClass: UserRedisCacheRepository}
    ],
  })
export class UserModule {}
