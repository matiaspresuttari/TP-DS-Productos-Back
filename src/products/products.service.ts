import { HttpException, Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { ProductEntity as ProductEntity } from 'src/entities/product.entity';
import { DeepPartial } from 'typeorm';
import { IProductEntity } from "../../DataBases/interfaces.db";
import { productTypes } from 'DataBases/productTypes.db';
import { brands } from 'DataBases/brands.db';

interface ProductFilters {
    type?: string;
    maxPrice?: number;
    minPrice?: number;
  }
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
        const product = await  this.repository.findOne({ where:{id}, relations:{productType:true, brand:true}});
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

    async updateProductTypeById(id: string, bodyUpdateProduct: DeepPartial<ProductEntity>): Promise<IProductEntity> {
        await this.repository.update(id,bodyUpdateProduct);
        const updateProduct = this.repository.findOneBy({id: parseInt(id)});
        return updateProduct;
    }

    
    async findProducts(filters: any): Promise<ProductEntity[]> {
        const query = this.repository.createQueryBuilder('product')
        .leftJoinAndSelect('product.productType', 'productType')
        .leftJoinAndSelect('product.brand', 'brand');

        if (filters.type) {
        query.andWhere('productType.name = :type', { type: filters.type });
        }
        if (filters.brand) {
            query.andWhere('brand.name = :brand', { brand: filters.brand });
        }
        if (filters.maxPrice) {
        query.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
        }
        if (filters.minPrice) {
        query.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
        }
        return await query.getMany();
    }
    async deleteProductById(id: number): Promise<void> {
        try {
            await this.repository.delete(id);
        } catch (error) {
            throw new HttpException('Delete product error', 500)
        }
    }
}
