import { ProductCategory } from '../types/product';

const products = [
  {
    id: 'testId1',
    category: 0,
    price: 1.2,
    name: 'test product1',
    amountInStockAvailable: 4,
  },
  {
    id: 'testId2',
    category: 0,
    price: 1.5,
    name: 'test product2',
    amountInStockAvailable: 2,
  },
];

const getProducts = (category: ProductCategory) => {
  return products;
};

export default {
  getProducts,
};
