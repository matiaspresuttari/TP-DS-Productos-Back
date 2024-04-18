import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('productTypes')
export class ProductTypeEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(()=>ProductEntity,(product)=>product.productType)
    products: ProductEntity[];
}