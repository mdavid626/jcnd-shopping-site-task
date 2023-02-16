import { Queries, queries } from '@testing-library/react';
import { act, renderHook, RenderHookOptions } from '@testing-library/react';
import React, { useMemo, useState } from 'react';
import ShoppingCartContext from '../../contexts/shopping-cart-context/shopping-cart-context';
import { testProduct1, testProduct2 } from '../../test-data/products';
import {
  testShoppingCart1,
  testShoppingCartItem1,
  testShoppingCartItem2,
} from '../../test-data/shopping-cart';
import {
  ShoppingCartContextValue,
  ShoppingCartItem,
} from '../../types/shopping-cart';
import {
  useAddToShoppingCart,
  useAvailableInStock,
  useRemoveFromShoppingCart,
  useShoppingCart,
} from './shopping-cart-hooks';

export const renderHookWithShoppingCart = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
  initialShoppingCart?: ShoppingCartItem[]
) => {
  let shoppingCartContext: { value?: ShoppingCartContextValue } = {};
  return {
    ...renderHook(render, {
      wrapper: ({ children }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [shoppingCart, setShoppingCart] = useState(
          initialShoppingCart || []
        );
        // eslint-disable-next-line react-hooks/rules-of-hooks
        shoppingCartContext.value = useMemo(
          () => ({ shoppingCart, setShoppingCart }),
          [shoppingCart, setShoppingCart]
        );
        return (
          <ShoppingCartContext.Provider value={shoppingCartContext.value}>
            {children}
          </ShoppingCartContext.Provider>
        );
      },
      ...options,
    }),
    shoppingCartContext,
  };
};

describe('shopping-cart-hooks', () => {
  describe('useShoppingCart', () => {
    it('should return shopping cart', () => {
      const { result, shoppingCartContext } = renderHookWithShoppingCart(
        () => useShoppingCart(),
        undefined,
        testShoppingCart1
      );
      expect(result.current).toEqual([
        testShoppingCart1,
        shoppingCartContext.value?.setShoppingCart,
      ]);
    });
  });

  describe('useAddToShoppingCart', () => {
    it('should add to shopping cart', () => {
      const { result, shoppingCartContext } = renderHookWithShoppingCart(
        () => useAddToShoppingCart(),
        undefined,
        [testShoppingCartItem1]
      );
      act(() => {
        result.current(testProduct2);
      });
      expect(shoppingCartContext.value?.shoppingCart).toStrictEqual([
        testShoppingCartItem1,
        {
          amount: 1,
          product: testProduct2,
        },
      ]);
    });

    it('should increase amount when product already in shopping cart', () => {
      const { result, shoppingCartContext } = renderHookWithShoppingCart(
        () => useAddToShoppingCart(),
        undefined,
        [testShoppingCartItem1, testShoppingCartItem2]
      );
      act(() => {
        result.current(testProduct2);
      });
      expect(shoppingCartContext.value?.shoppingCart).toStrictEqual([
        testShoppingCartItem1,
        {
          amount: 37,
          product: testShoppingCartItem2.product,
        },
      ]);
    });
  });

  describe('useRemoveFromShoppingCart', () => {
    it('should decrease amount when bigger than 1', () => {
      const { result, shoppingCartContext } = renderHookWithShoppingCart(
        () => useRemoveFromShoppingCart(),
        undefined,
        [testShoppingCartItem1, testShoppingCartItem2]
      );
      act(() => {
        result.current(testProduct1);
      });
      expect(shoppingCartContext.value?.shoppingCart).toStrictEqual([
        {
          ...testShoppingCartItem1,
          amount: 2,
        },
        testShoppingCartItem2,
      ]);
    });

    it('should remove from shopping cart', () => {
      const { result, shoppingCartContext } = renderHookWithShoppingCart(
        () => useRemoveFromShoppingCart(),
        undefined,
        [{ ...testShoppingCartItem1, amount: 1 }, testShoppingCartItem2]
      );
      act(() => {
        result.current(testProduct1);
      });
      expect(shoppingCartContext.value?.shoppingCart).toStrictEqual([
        testShoppingCartItem2,
      ]);
    });
  });

  describe('useAvailableInStock', () => {
    it('should return stock availability', () => {
      const { result } = renderHookWithShoppingCart(
        () => useAvailableInStock(testProduct1),
        undefined,
        [testShoppingCartItem1, testShoppingCartItem2]
      );
      expect(result.current).toBe(2);
    });

    it('should return when product not in shopping cart', () => {
      const { result } = renderHookWithShoppingCart(
        () => useAvailableInStock(testProduct1),
        undefined,
        [testShoppingCartItem2]
      );
      expect(result.current).toBe(5);
    });
  });
});
