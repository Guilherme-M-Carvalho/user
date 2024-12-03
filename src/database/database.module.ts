
import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { DatabaseService } from './database.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { RedisService } from 'src/config/redis';

@Module({
    imports: [HttpModule],
    providers: [DatabaseService, ConnectionService, RedisService],
    exports: [DatabaseService, ConnectionService],
})
export class DatabaseModule { }
