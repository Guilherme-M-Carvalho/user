import { Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TenantRedis } from './tenant-redis';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import * as dotenv from 'dotenv';

dotenv.config();

const MS_CORE_URL = process.env.MS_CORE_URL

@Injectable()
export class TenantProvider {
    private dataSource: DataSource;

    constructor(
        private readonly tenantRedis: TenantRedis,
        private readonly httpService: HttpService
    ){}

    async connect(tenantId: string){
        if(this.dataSource){
            await this.dataSource.destroy();
        }

        let tenant = await this.tenantRedis.findTenantById(tenantId);

        if(!tenant){
            tenant = await this.findTenantConfig(tenantId)
            if (!tenant) {
                throw new InternalServerErrorException(`Tenant ${tenantId} não encontrado.`);
            }
            console.log("DB/MS");
            await this.tenantRedis.create(tenant, tenantId)
        }
        

        const dataSourceOptions: DataSourceOptions = {
            type: 'postgres',
            host: tenant.host,
            port: 5432,
            username: tenant.user,
            password: tenant.password,
            database: tenant.name,
            entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
            ],
            synchronize: false,
        }

        this.dataSource = new DataSource(dataSourceOptions);

        await this.dataSource.initialize();
    }

    getDataSource(){
        if(!this.dataSource){
            throw new InternalServerErrorException("Datasource não inicializado!")
        }

        return this.dataSource;
    }

    async findTenantConfig(tenantId: string): Promise<any> {
        try {
            const response: AxiosResponse = await this.httpService
            .get(`${MS_CORE_URL}/tenant/${tenantId}/credentials`)
            .toPromise();

            if (!response.data) {
                throw new InternalServerErrorException('No database config found for tenant');
            }

            return response.data;
        } catch (error) {
            throw new InternalServerErrorException('Error fetching tenant database config', error.message);
        }
    }
}
