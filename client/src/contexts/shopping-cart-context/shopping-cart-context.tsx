import { createContext } from 'react';
import { ShoppingCartContextValue } from '../../types/shopping-cart';

const ShoppingCartContext = createContext<ShoppingCartContextValue>({
  shoppingCart: [],
  setShoppingCart: () => {},
});

export default ShoppingCartContext;
