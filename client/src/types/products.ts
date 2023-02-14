import { PageInfo } from './page-info';

export type ProductCategory = 'VEGETABLES' | 'FRUITS' | 'CHEESE';

export type Product = {
  id: string;
  price: number;
  name: string;
  inStock: number;
};

export type ProductsQueryResult = {
  products: { nodes: Product[]; pageInfo: PageInfo };
};
