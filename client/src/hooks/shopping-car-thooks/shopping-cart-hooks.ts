import { useCallback, useContext, useMemo } from 'react';
import ShoppingCartContext from '../../contexts/shopping-cart-context/shopping-cart-context';
import { Product } from '../../types/products';
import { ShoppingCartItem } from '../../types/shopping-cart';

export const useShoppingCart = (): [
  ShoppingCartItem[],
  (newShoppingCart: ShoppingCartItem[]) => void
] => {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  return [shoppingCart, setShoppingCart];
};

export const useAddToShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useShoppingCart();
  return useCallback(
    (productToAdd: Product) => {
      const existingProduct = shoppingCart.find(
        ({ product }) => product.id === productToAdd.id
      );
      if (existingProduct) {
        const newShoppingCart = shoppingCart.map((item) =>
          item.product.id === productToAdd.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        setShoppingCart(newShoppingCart);
      } else {
        const newShoppingCartItem: ShoppingCartItem = {
          product: productToAdd,
          amount: 1,
        };
        const newShoppingCart = [...shoppingCart, newShoppingCartItem];
        setShoppingCart(newShoppingCart);
      }
    },
    [shoppingCart, setShoppingCart]
  );
};

export const useRemoveFromShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useShoppingCart();
  return useCallback(
    (productToRemove: Product) => {
      const existingProduct = shoppingCart.find(
        ({ product }) => product.id === productToRemove.id
      );
      if (existingProduct && existingProduct.amount > 1) {
        const newShoppingCart = shoppingCart.map((item) =>
          item.product.id === productToRemove.id
            ? { ...item, amount: item.amount - 1 }
            : item
        );
        setShoppingCart(newShoppingCart);
      } else {
        const newShoppingCart = shoppingCart.filter(
          (item) => item.product.id !== productToRemove.id
        );
        setShoppingCart(newShoppingCart);
      }
    },
    [shoppingCart, setShoppingCart]
  );
};

export const useAvailableInStock = (product: Product) => {
  const [shoppingCart] = useShoppingCart();
  return useMemo(() => {
    const shoppingCartItem = shoppingCart.find(
      (item) => item.product.id === product.id
    );
    return product.inStock - (shoppingCartItem?.amount || 0);
  }, [shoppingCart, product.id, product.inStock]);
};
