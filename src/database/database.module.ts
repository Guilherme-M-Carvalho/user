
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import AppDataSource from './datasource';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
