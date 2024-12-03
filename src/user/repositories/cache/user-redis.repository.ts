import { Inject, Injectable } from "@nestjs/common";
import { RedisService } from "src/config/redis";
import { TenantProvider } from "src/tenant/tenant.provider";
import { User } from "src/user/entities/user.entity";
import { IUserRepository } from "src/user/repositories/interfaces/IUserRepository";
import { Repository } from "typeorm";

@Injectable()
export class UserRedisCacheRepository implements IUserRepository {
    private userRepository: Repository<User>

    constructor(
        private readonly redis: RedisService,
        private readonly tenantProvider: TenantProvider,
    ) {
    }
    
    
    create(user: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<User | null> {
        
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<User[]> {
        const dataSource = this.tenantProvider.getDataSource()
        this.userRepository = dataSource.getRepository(User);
        const cache = await this.redis.get('users')
        console.log(this.userRepository);
        
        if(!cache){
            const users = await this.userRepository.find();

            await this.redis.set('users', JSON.stringify(users), 'EX', 15)
            console.log("BD");
            return users
        }

        console.log("CACHE");
        
        
        return JSON.parse(cache)
    }

}