import { Controller, Get, Query, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { query } from 'express';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('version/:type')
  getVersion(
    @Query() query: { all?: boolean },
    @Param() params:{type:string}
  ): string | {number:number;date:Date;creator:string} {
    console.log(query);
    return this.appService.getVersion(query);
  }
}
