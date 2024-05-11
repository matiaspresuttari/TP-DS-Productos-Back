import { HttpException, Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { products } from '../../DataBases/products.db'

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
    async findProductById(id: string): Promise<ProductEntity> {
        try {
            const productFound = products.filter((product)=> product.id = id);
            if (!productFound) {
                throw new NotFoundException(`El producto con id ${id} no existe.`);
            }
            return productFound;
        } catch (error) {
            throw new HttpException('Error al buscar el producto', HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
            return await this.repository.find({ relations: ["ProductTypeEntity"] });
        } catch (error) {
            throw new HttpException('Find all products error', 500)
        }   
    }
}
