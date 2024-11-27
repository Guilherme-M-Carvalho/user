import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { IUserRepository } from './repositories/interfaces/IUserRepository';
import { RedisService } from 'src/config/redis';
import { UserRedisCacheRepository } from './repositories/cache/user-redis.repository';
import { UserPostgresRepository } from './repositories/postgres/user-postgres.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
      ...userProviders,
      UserService,
      RedisService,
      {provide: IUserRepository, useClass: UserRedisCacheRepository}
    ],
  })
export class UserModule {}
