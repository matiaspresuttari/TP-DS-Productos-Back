import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity} from 'typeorm';
import { ProductEntity } from './product.entity';
import { IBrandEntity } from '../../DataBases/interfaces.db';
import { IProductEntity } from '../../DataBases/interfaces.db';

@Entity('brands')
export class BrandEntity extends BaseEntity implements IBrandEntity{
    @PrimaryGeneratedColumn()
        id: number;
    @Column({nullable: false})
        name: string;
    @Column({nullable: false})
        type: string;
    @Column({nullable: false})
        country: string;    
    @OneToMany(()=>ProductEntity,(product)=>product.brand)
        products: IProductEntity[];
}
    