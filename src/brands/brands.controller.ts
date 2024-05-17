import { Controller, Body, Post, Get, Put ,Param} from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { BrandEntity } from 'src/entities/brand.entity';
import { BrandsService } from './brands.service';


@Controller('brands')
export class BrandsController {
    constructor(private service: BrandsService) {}
    @Post()
    async createBrands(@Body() brand: DeepPartial<BrandEntity>): Promise<BrandEntity>{
        return await this.service.createBrands(brand);
    }
    @Get()
    async findBrands(): Promise<BrandEntity[]>{
        return await this.service.findBrands();
    }
    
    @Put(':id')
    async updateBrandsById(@Param("id") id:string, @Body() updateBrands: DeepPartial<BrandEntity>): Promise<BrandEntity>{
        return await this.service.updateBrandsById(id, updateBrands);
    }

    @Get(":id")
    async findBrandsById(@Param("id") id:number): Promise<BrandEntity>{
        return await this.service.findBrandsById(id);
    }
}
