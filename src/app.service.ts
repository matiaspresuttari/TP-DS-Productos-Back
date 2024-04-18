import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getVersion(query:{all?: boolean;}): string | {number: number;date:Date;creator:string }{
    if (query.all){
      return {
        number: 1,
        date: new Date(),
        creator:'Matías P.'
      }
    }
    return "Version 1";
  }
}