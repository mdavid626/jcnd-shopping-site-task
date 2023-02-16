import { Product } from './products';

export type ShoppingCartItem = {
  product: Product;
  amount: number;
};

export type ShoppingCartContextValue = {
  shoppingCart: ShoppingCartItem[];
  setShoppingCart: (newShoppingCartItems: ShoppingCartItem[]) => void;
};
