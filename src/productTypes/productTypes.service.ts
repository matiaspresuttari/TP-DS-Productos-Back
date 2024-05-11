import { HttpException, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductTypeEntity } from 'src/entities/productType.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductTypesService {
    repository = ProductTypeEntity;
    async createProductType(productType: DeepPartial<ProductTypeEntity>): Promise<ProductTypeEntity> {
        try {
            return await this.repository.save(productType);
        } catch (error) {
            throw new HttpException('Create product type error', 500)
        }
    }

    async findProductTypeById(){
        try {
            return await this.repository.find();
        } catch (error) {
            throw new HttpException('Find product type error', 500)
        }   
    }

    async updateProductTypeById(){
        try {
            return await this.repository.find();
        } catch (error) {
            throw new HttpException('Find product type error', 500)
        }   
    }

}
