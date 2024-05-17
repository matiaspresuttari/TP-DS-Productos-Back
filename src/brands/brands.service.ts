import { HttpException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { BrandEntity } from 'src/entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandsService {
    repository = BrandEntity;
    async createBrands(brand: DeepPartial<BrandEntity>): Promise<BrandEntity> {
        try {
            return await this.repository.save(brand);
        } catch (error) {
            throw new HttpException('Create brand type error', 500)
        }
    }
    async findBrands(){
        try {
            return await this.repository.find();
        } catch (error) {
            throw new HttpException('Find brand type error', 500)
        }   
    }
    async updateBrandsById(id: string, updateBrands: DeepPartial<BrandEntity>): Promise<BrandEntity> {
        const queryUpdate = await this.repository.findOneBy({id: parseInt(id),});  
        await this.repository.update(id,updateBrands);
        const updateBrand = this.repository.findOneBy({id: parseInt(id)});
        return updateBrand;
    }
    async findBrandsById(id: number): Promise<BrandEntity> {
        const query = this.repository.createQueryBuilder('brands')
            .where('brands.id = :id', { id });
        const product = await query.getOne();
        if (!product) {
            throw new NotFoundException(`Brand with id ${id} not found`);
        }
        return product;
    }
}
