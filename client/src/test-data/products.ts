import { Product, ProductsQueryResult } from '../types/products';

export const testProduct1: Product = {
  id: '63ea6485732ff5cf8b36442c',
  name: 'Artichoke',
  price: 46.36,
  inStock: 5,
};

export const testProduct2: Product = {
  id: '63ea6485732ff5cf8b36442d',
  name: 'Asparagus',
  price: 25.36,
  inStock: 3,
};

export const testProductQueryResult1: ProductsQueryResult = {
  products: {
    nodes: [testProduct1, testProduct2],
    pageInfo: {
      page: 1,
      numberOfPages: 2,
    },
  },
};
