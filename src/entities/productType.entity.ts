import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('productTypes')
export class ProductTypeEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @OneToMany(()=>ProductEntity,(product)=>product.productType)
    products: ProductEntity[];
}