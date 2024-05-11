import { Controller, Body, Post, Get, Put } from '@nestjs/common';
import { ProductTypeEntity } from 'src/entities/productType.entity';
import { DeepPartial } from 'typeorm';
import { ProductTypesService } from './productTypes.service';

@Controller('product-types')
export class ProductsController {
    constructor(private service: ProductTypesService) {}
    @Post()
    async createProductType(@Body() product: DeepPartial<ProductTypeEntity>): Promise<ProductTypeEntity>{
        return await this.service.createProductType(product);
    }
    @Get()
    async findProductTypeById(): Promise<ProductTypeEntity[]>{
        return await this.service.findProductTypeById();
    }
    @Put()
    async updateProductTypeById(): Promise<ProductTypeEntity[]>{
        return await this.service.updateProductTypeById();
    }
    //@Get()
    //async findProducts(): Promise<ProductTypeEntity[]>{
    //    return await this.service.findProductTypeById();
    //}
}
