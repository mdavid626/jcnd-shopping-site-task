import { createContext } from 'react';
import { ShoppingCartItem } from '../../types/shopping-cart';

const ShoppingCartContext = createContext<{
  shoppingCart: ShoppingCartItem[];
  setShoppingCart: (newShoppingCart: ShoppingCartItem[]) => void;
}>({ shoppingCart: [], setShoppingCart: () => {} });

export default ShoppingCartContext;
