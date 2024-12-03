import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { RedisService } from '../config/redis';
import { DatabaseService } from './database.service';
import { DatabaseDto } from './dto/database.dto';

@Injectable()
export class ConnectionService {
  private static connections: Map<string, DataSource> = new Map();

  constructor(
    private readonly redisService: RedisService,
    private readonly databaseService: DatabaseService
  ) {}

  async getConnection(tenantId: string): Promise<DataSource> {
    
    if (ConnectionService.connections.has(tenantId)) {
      console.log("MEMORY");
      
      return ConnectionService.connections.get(tenantId);
    }

    const tenantConfig = await this.databaseService.findTenantConfig(tenantId);
    
    if (!tenantConfig) {
      throw new Error('Tenant configuration not found');
    }
    
    const connection = await this.createDynamicConnection(tenantConfig);

    ConnectionService.connections.set(tenantId, connection);
    console.log(ConnectionService.connections);

    return connection;
  }

  private async createDynamicConnection(tenantConfig:DatabaseDto): Promise<DataSource> {

    const connectionOptions: DataSourceOptions = {
        type: 'postgres',
        host: tenantConfig.db_host,
        port: 5432,
        username: tenantConfig.db_user,
        password: tenantConfig.db_password,
        database: tenantConfig.db_name,
        entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
    };
    const dataSource = new DataSource(connectionOptions);
    await dataSource.initialize();

    return dataSource;
  }

  static async closeAllConnections() {
    for (const dataSource of ConnectionService.connections.values()) {
      await dataSource.destroy();
    }
    ConnectionService.connections.clear();
  }
}
