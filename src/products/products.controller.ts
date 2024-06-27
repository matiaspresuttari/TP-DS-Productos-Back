import { Controller, Body, Post, Get, Put, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { ProductEntity as ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { ProductsService } from './products.service';
import { IProductEntity } from "../../DataBases/interfaces.db";
import { AuthGuard } from 'src/middlewares/auth.middleware';


@Controller('products')
export class ProductsController {
    constructor(private service: ProductsService) {}
    @Post()
    async createProduct(@Body() product: DeepPartial<ProductEntity>): Promise<IProductEntity>{
        return await this.service.createProduct(product);
    }
    @Get(':id')
    async findProductById(@Param('id') id: number): Promise<IProductEntity>{
        return await this.service.findProductById(id);
    }
    @Put(':id')
    async updateProductById(@Param('id') id: number, @Body() bodyUpdateProduct: Partial<ProductEntity>): Promise<IProductEntity>{
        return await this.service.updateProductById(id, bodyUpdateProduct);
    }
    @UseGuards(new AuthGuard('list-products'))
    @Get()
    async findProducts(): Promise<ProductEntity[]>{
        return await this.service.findProducts();
    }
    @Delete(':id')
    async deleteProductById(@Param('id') id: number): Promise<void>{
        return await this.service.deleteProductById(id);
    }
}
