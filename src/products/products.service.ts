import { HttpException, Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { ProductEntity as ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { IProductEntity , IProductTypeEntity } from "../../DataBases/interfaces.db";
import { productTypes } from 'DataBases/productTypes.db';

@Injectable()
export class ProductsService {
    repository = ProductEntity;
    
    async createProduct(product: DeepPartial<ProductEntity>): Promise<IProductEntity> {
        try {
            return await this.repository.save(product);
        } catch (error) {
            throw new HttpException('Create product error', 500)
        }
    }

    /**
     * Busca un producto por su ID.
     * 
     * @param id - El ID del producto a buscar.
     * @returns Una promesa que se resuelve con el producto encontrado.
     * @throws {NotFoundException} Si no se encuentra ningún producto con el ID especificado.
     */
    async findProductById(id: number): Promise<IProductEntity> {
        const product =await  this.repository.findOne({ where:{id}, relations:{productType:true}});
        return product;
    }

    async updateProductById(id: number, product: DeepPartial<ProductEntity>) : Promise<IProductEntity> {
        const query = this.repository.createQueryBuilder('product')
            .where('product.id = :id', { id });
        const productActual = await query.getOne();
        this.repository.merge(productActual, product);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return await this.repository.save(productActual);
    }

    // async updateProductById(id: number, updateData: Partial<ProductEntity>): Promise<ProductEntity> {
    //     // Buscar el producto existente
    //     const product = await this.repository.findOneBy({ id });
    //     if (!product) {
    //         throw new NotFoundException(`Product with id ${id} not found`);
    //     }

    //     // Actualizar el producto con los nuevos datos
    //     Object.assign(product, updateData);

    //     // Guardar el producto actualizado
    //     await this.repository.save(product);

    //     return product;
    // }

    async findProducts(){
        try {            
            return await this.repository.find({
                relations: ['productType']
            });
        } catch (error) {
            throw new HttpException('Find all products error', 500)
        }   
    }
}
