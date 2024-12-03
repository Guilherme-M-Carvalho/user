import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":id")
  async getHello(@Param("id") id: string) {
    return await this.appService.find(id);
  }

  @Get()
  async get(@Param("id") id: string) {
    return 'Hello World!';
  }
}
