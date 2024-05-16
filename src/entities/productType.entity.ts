import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from "typeorm";
import { ProductEntity } from "./product.entity";
import { IProductTypeEntity } from "../../DataBases/interfaces.db";
import { IProductEntity } from "../../DataBases/interfaces.db";
@Entity('productTypes')
export class ProductTypeEntity extends BaseEntity implements IProductTypeEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @OneToMany(()=>ProductEntity,(product)=>product.productType)
    products: IProductEntity[];
}