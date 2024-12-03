import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TenantModule } from './tenant/tenant.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { UserModule } from './user/user.module';

@Module({
  imports: [HttpModule, TenantModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
