import { Controller, Body, Post, Get } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private service: ProductsService) {}

    @Post()
    async create(@Body() product: DeepPartial<ProductEntity>): Promise<ProductEntity>{
        return await this.service.create(product);
    }

    @Get()
    async findAll(): Promise<ProductEntity[]>{
        return await this.service.findAll();
    }
}
