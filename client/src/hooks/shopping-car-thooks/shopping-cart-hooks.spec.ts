import { act, waitFor } from '@testing-library/react';
import { testProduct1, testProduct2 } from '../../test-data/products';
import { placeOrderQueryResult1 } from '../../test-data/query-results';
import {
  testShoppingCart1,
  testShoppingCartItem1,
  testShoppingCartItem2,
} from '../../test-data/shopping-cart';
import {
  renderHookWithShoppingCart,
  renderHookWithShoppingCartAndQueryClientAndRouter,
} from '../../testing-library/render';
import {
  useAddToShoppingCart,
  useAvailableInStock,
  usePlaceOrder,
  useRemoveFromShoppingCart,
  useShoppingCart,
} from './shopping-cart-hooks';

describe('shopping-cart-hooks', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    jest.spyOn(window, 'alert').mockReturnValue(undefined);
  });
  afterEach(jest.resetAllMocks);

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

  describe('usePlaceOrder', () => {
    it('should place order', async () => {
      fetchMock.mockResponse(JSON.stringify(placeOrderQueryResult1));
      const { result, shoppingCartContext, router } =
        renderHookWithShoppingCartAndQueryClientAndRouter(
          () => usePlaceOrder(),
          undefined,
          testShoppingCart1
        );
      expect(result.current).toStrictEqual([expect.any(Function), false]);
      act(() => {
        result.current[0]();
      });
      await waitFor(() => {
        expect(router.location?.pathname).toBe('/thank-you');
      });
      expect(shoppingCartContext.value?.shoppingCart).toStrictEqual([]);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0]).toMatchSnapshot('query');
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('should show error when error', async () => {
      fetchMock.mockRejectedValue(new Error('test error'));
      const { result } = renderHookWithShoppingCartAndQueryClientAndRouter(
        () => usePlaceOrder(),
        undefined,
        testShoppingCart1
      );
      expect(result.current).toStrictEqual([expect.any(Function), false]);
      act(() => {
        result.current[0]();
      });
      await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('test error');
      });
    });
  });
});
