import { Injectable, Scope } from "@nestjs/common";
import { RedisService } from "src/config/redis";
import { Tenant } from "./entity/tenant.entity";

@Injectable()
export class TenantRedis {
    constructor(
        private readonly redis: RedisService,
    ){}

    async findTenantById(id: string): Promise<Tenant | null> {
        const key = `tenant:${id}:credentials`;
        const cachedCredentials = await this.redis.get(key);
        if (!cachedCredentials) {
          return null;
        }
        console.log("CACHE");
        
        return JSON.parse(cachedCredentials);
    }

    async create(tenant: Tenant, id: string): Promise<Tenant> {
        
        const key = `tenant:${id}:credentials`;
        await this.redis.set(key, JSON.stringify(tenant), 'EX', 15);
        return tenant;
    }
}