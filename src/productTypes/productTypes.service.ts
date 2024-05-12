import { HttpException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductTypeEntity } from 'src/entities/productType.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class ProductTypesService {
    repository = ProductTypeEntity;
    constructor(
        @InjectRepository(ProductTypeEntity)
        private readonly productTypeRepository: Repository<ProductTypeEntity>,
    ) {}
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

    async updateProductTypeById(id: number, update: DeepPartial<ProductTypeEntity>): Promise<ProductTypeEntity> {
        try {
            // Actualizar el tipo de producto en la base de datos
            const updateResult = await this.productTypeRepository.update(id, update);
            // Verificar si el tipo de producto fue actualizado exitosamente
            if (updateResult.affected === 0) {
                throw new NotFoundException(`Product type with id ${id} not found`);
            }
            // Obtener el tipo de producto actualizado
            console.log(`Update result:`, updateResult);

            const query = this.repository.createQueryBuilder('productType')
            .where('productType.id = :id', { id });
            const updatedProductType = await query.getOne();
            console.log(`Update result:`, updatedProductType);

            // Devolver el tipo de producto actualizado
            return updatedProductType;
        } catch (error) {
            throw new BadRequestException(error.message);
        }   
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
