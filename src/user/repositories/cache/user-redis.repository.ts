import { Inject, Injectable } from "@nestjs/common";
import { RedisService } from "src/config/redis";
import { User } from "src/user/entities/user.entity";
import { IUserRepository } from "src/user/repositories/interfaces/IUserRepository";
import { Repository } from "typeorm";

@Injectable()
export class UserRedisCacheRepository implements IUserRepository {
    constructor(
        private readonly redis: RedisService,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ){}

    create(user: Partial<User>): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<User | null> {

        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<User[]> {
        const cache = await this.redis.get('users')
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