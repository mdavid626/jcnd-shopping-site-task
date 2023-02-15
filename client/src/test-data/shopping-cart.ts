import { ShoppingCartItem } from '../types/shopping-cart';
import { testProduct1, testProduct2 } from './products';

export const testShoppingCartItem1: ShoppingCartItem = {
  product: testProduct1,
  amount: 3,
};

export const testShoppingCartItem2: ShoppingCartItem = {
  product: testProduct2,
  amount: 36,
};

export const testShoppingCart1: ShoppingCartItem[] = [
  testShoppingCartItem1,
  testShoppingCartItem2,
];
