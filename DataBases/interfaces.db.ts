export interface IProductEntity {
  id: number;
  name: string;
  price: number;
  productType: IProductTypeEntity;
  brand: IBrandEntity;
  color: string;
  size: string;
}

export interface IProductTypeEntity {
  id: number;
  name: string;
}

export interface IBrandEntity {
  id: number;
  name: string;
  type: string;
  country: string;
}