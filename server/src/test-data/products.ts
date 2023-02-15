import { Product, ProductsQueryResult } from '../types/product';

const testProduct1: Product = {
  id: '63ea6485732ff5cf8b36442c',
  name: 'Artichoke',
  category: 'VEGETABLES',
  priceInCents: 123,
  inStock: 5,
};

const testProduct2: Product = {
  id: '63ea6485732ff5cf8b36442d',
  name: 'Asparagus',
  category: 'VEGETABLES',
  priceInCents: 456,
  inStock: 3,
};

export const testProductsQueryResult1: ProductsQueryResult = {
  nodes: [testProduct1, testProduct2],
  pageInfo: {
    page: 1,
    numberOfPages: 5,
  },
};
