import { Module } from '@nestjs/common';
import { ProductsController } from './productTypes.controller';
import { ProductTypesService } from './productTypes.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductTypesService]
})
export class ProductTypesModule {}
