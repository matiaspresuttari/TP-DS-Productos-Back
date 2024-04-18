import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { ProductTypeEntity } from "./productType.entity";

@Entity('products')
export class ProductEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    price: number;
    @ManyToOne(()=>ProductTypeEntity,(productType)=>productType.products)
    productType: ProductTypeEntity;
}