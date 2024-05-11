import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { ProductTypeEntity } from "./productType.entity";

@Entity('products')
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false})
    price: number;
    @ManyToOne(()=>ProductTypeEntity,(productType)=>productType.products)
    productType: ProductTypeEntity;
}