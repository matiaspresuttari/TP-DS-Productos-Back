import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { ProductTypeEntity } from "./productType.entity";

@Entity('products')
export class ProductEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    price: number;
    @ManyToOne(()=>ProductTypeEntity,(productType)=>productType.products)
    productType: ProductTypeEntity;
}