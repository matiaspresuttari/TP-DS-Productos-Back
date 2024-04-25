import { HttpException, Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ProductsService {
    repository = ProductEntity;
    async create(product: DeepPartial<ProductEntity>): Promise<ProductEntity> {
        try {
            return await this.repository.save(product);
        } catch (error) {
            throw new HttpException('Create product error', 500)
        }
    }
    async findAll(){
        try {
            return await this.repository.find();
        } catch (error) {
            throw new HttpException('Find all products error', 500)
        }   
    }
}
