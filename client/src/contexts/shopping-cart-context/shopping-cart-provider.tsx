import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import { ShoppingCartItem } from '../../types/shopping-cart';
import ShoppingCartContext from './shopping-cart-context';

const storageKey = 'shoppingCart';

const ShoppingCartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [storageItem, setStorageItem] = useState(
    window.sessionStorage.getItem(storageKey)
  );
  const shoppingCart = useMemo(
    () => (storageItem ? JSON.parse(storageItem) : []),
    [storageItem]
  );
  const setShoppingCart = useCallback(
    (newShoppingCart: ShoppingCartItem[]) => {
      const newStorageItem = JSON.stringify(newShoppingCart);
      window.sessionStorage.setItem(storageKey, newStorageItem);
      setStorageItem(newStorageItem);
    },
    [setStorageItem]
  );
  const value = useMemo(
    () => ({
      shoppingCart,
      setShoppingCart,
    }),
    [shoppingCart, setShoppingCart]
  );
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
