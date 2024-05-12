import { HttpException, Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { products } from '../../DataBases/products.db'
import { ProductTypeEntity } from 'src/entities/productType.entity';

@Injectable()
export class ProductsService {
    repository = ProductEntity;
    
    async createProduct(product: DeepPartial<ProductEntity>): Promise<ProductEntity> {
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
    async findProductById(id: number): Promise<ProductEntity> {
        const query = this.repository.createQueryBuilder('product')
            .leftJoinAndSelect('product.productType', 'productType')
            .where('product.id = :id', { id });
    
        console.log(query.getSql());
        const product = await query.getOne();
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }


    // async updateProductById(){
    //     try {
            
    //         return await this.repository.update();
    //     } catch (error) {
    //         throw new HttpException('Find product error', 500)
    //     }   
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
