import { Module } from '@nestjs/common';
import { TenantProvider } from './tenant.provider';
import { TenantRedis } from './tenant-redis';
import { RedisService } from 'src/config/redis';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [TenantProvider, TenantRedis, RedisService],
  exports: [TenantProvider],
})

export class TenantModule {}
