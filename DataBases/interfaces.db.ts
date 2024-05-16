export interface IProductEntity {
  id: number;
  name: string;
  price: number;
  productType: IProductTypeEntity;
  brand: string;
  color: string;
  size: string;
}


export interface IProductTypeEntity {
  id: number;
  name: string;
}


export interface IBrandEntity {
  name: string;
  type: string;
  country: string;
}