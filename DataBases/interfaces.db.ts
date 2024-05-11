export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  type: string;
  brand: string;
  color: string;
  size: string;
}

export interface BrandEntity {
  name: string;
  type: string;
  country: string;
}
