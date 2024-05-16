import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from "typeorm";
import { ProductTypeEntity } from "./productType.entity";
import { IProductEntity , IProductTypeEntity } from "../../DataBases/interfaces.db";


@Entity('products')
export class ProductEntity extends BaseEntity implements IProductEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false})
    price: number;
    @Column({nullable: false})
    brand: string;
    @Column({nullable: false})
    size: string;
    @Column({nullable: false})
    color: string;
    @ManyToOne(()=>ProductTypeEntity,(productType)=>productType.products)
    productType: IProductTypeEntity;
}