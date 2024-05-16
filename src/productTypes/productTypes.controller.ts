import { Controller, Body, Post, Get, Put ,Param} from '@nestjs/common';
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
    async findProductTypes(): Promise<ProductTypeEntity[]>{
        return await this.service.findProductTypes();
    }
    
    @Put(':id')
    async updateProductTypeById(@Param("id") id:string, @Body() updateProduct: DeepPartial<ProductTypeEntity>): Promise<ProductTypeEntity>{
        return await this.service.updateProductTypeById(id, updateProduct);
    }

    @Get(":id")
    async findProductTypesById(@Param("id") id:number): Promise<ProductTypeEntity>{
        return await this.service.findProductTypesById(id);
    }
}
