import { User } from "src/user/entities/user.entity";

export abstract class IUserRepository {
    abstract create(user: Partial<User>): Promise<User>;
    abstract findById(id: number): Promise<User | null>;
    abstract findAll(): Promise<User[]>;
  }