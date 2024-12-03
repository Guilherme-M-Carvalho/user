import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class DatabaseService {
  constructor(private readonly httpService: HttpService) {}

  async findTenantConfig(tenantId: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpService
        .get(`http://localhost:3001/tenant/${tenantId}/credentials`)
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
