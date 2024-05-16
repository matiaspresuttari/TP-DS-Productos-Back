import { HttpException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductTypeEntity } from 'src/entities/productType.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


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

    async findProductTypes(){
        try {
            return await this.repository.find();
        } catch (error) {
            throw new HttpException('Find product type error', 500)
        }   
    }

    async updateProductTypeById(id: string, updateProduct: DeepPartial<ProductTypeEntity>): Promise<ProductTypeEntity> {
        const queryUpdate = await this.repository.findOneBy({id: parseInt(id),});  
        await this.repository.update(id,updateProduct);
        const updateProductType = this.repository.findOneBy({id: parseInt(id)});
        return updateProductType;
    }


    async findProductTypesById(id: number): Promise<ProductTypeEntity> {
        const query = this.repository.createQueryBuilder('productType')
            .where('productType.id = :id', { id });
        const product = await query.getOne();
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }
}
