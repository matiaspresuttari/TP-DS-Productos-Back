import { Controller, Body, Post, Get, Put, Param, Query } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private service: ProductsService) {}
    @Post()
    async createProduct(@Body() product: DeepPartial<ProductEntity>): Promise<ProductEntity>{
        return await this.service.createProduct(product);
    }
    @Get(':id')
    async findProductById(@Param('id') id: number): Promise<ProductEntity>{
        return await this.service.findProductById(id);
    }
    @Put(':id')
    async updateProductById(@Param('id') id: number, @Body() updateData: Partial<ProductEntity>): Promise<ProductEntity>{
        return await this.service.updateProductById(id, updateData);
    }
    @Get()
    async findProducts(): Promise<ProductEntity[]>{
        return await this.service.findProducts();
    }
}
