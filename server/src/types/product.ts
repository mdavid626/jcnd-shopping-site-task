import { PageInfo } from './page-info';

export type ProductCategory = 'VEGETABLES' | 'FRUITS' | 'CHEESE';

export type Product = {
  id: string;
  category: ProductCategory;
  priceInCents: number;
  name: string;
  inStock: number;
};

export type ProductsQueryResult = {
  nodes: Product[];
  pageInfo: PageInfo;
};
