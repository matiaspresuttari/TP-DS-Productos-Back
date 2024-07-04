import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { ProductTypeEntity } from "./productType.entity";
import { IProductEntity , IProductTypeEntity , IBrandEntity } from "../../DataBases/interfaces.db";
import { BrandEntity } from "./brand.entity";


@Entity('products')
export class ProductEntity extends BaseEntity implements IProductEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false})
    price: number;
    @Column({nullable: false})
    size: string;
    @Column({nullable: false})
    color: string;
    @ManyToOne(()=>BrandEntity,(brand)=>brand.products,{ eager: true })
    brand: IBrandEntity;
    @ManyToOne(()=>ProductTypeEntity,(productType)=>productType.products,{ eager: true })
    productType: IProductTypeEntity;
}