import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ProductTypesModule } from './productTypes/productTypes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';

@Module({
  imports: [ProductsModule, TypeOrmModule.forRoot({
    type:'sqlite',
    database:'products.db',
    entities,
    synchronize:true,
  }), ProductTypesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}