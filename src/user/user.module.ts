import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories/user.repository';
import { IUserRepository } from './repositories/interfaces/IUserRepository';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [
      ...userProviders,
      UserService,
      {provide: IUserRepository, useClass: UserRepository}
    ],
  })
export class UserModule {}
