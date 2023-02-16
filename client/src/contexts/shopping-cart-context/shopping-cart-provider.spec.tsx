import { act, render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, useContext } from 'react';
import {
  testShoppingCart1,
  testShoppingCartItem1,
} from '../../test-data/shopping-cart';
import { ShoppingCartContextValue } from '../../types/shopping-cart';
import ShoppingCartContext from './shopping-cart-context';
import ShoppingCartProvider from './shopping-cart-provider';

const renderProvider = (
  component: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => {
  const shoppingCartContext: { value?: ShoppingCartContextValue } = {};
  return {
    ...render(component, {
      wrapper: ({ children }) => {
        const Children = () => {
          shoppingCartContext.value = useContext(ShoppingCartContext);
          return children;
        };
        return (
          <ShoppingCartProvider>
            <Children />
          </ShoppingCartProvider>
        );
      },
      ...options,
    }),
    shoppingCartContext,
  };
};
describe('shopping-cart-provider', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it('should provide value', () => {
    window.sessionStorage.setItem(
      'shoppingCart',
      JSON.stringify(testShoppingCart1)
    );
    const { asFragment, shoppingCartContext } = renderProvider(
      <div>content</div>
    );
    expect(asFragment()).toMatchSnapshot();
    expect(shoppingCartContext.value).toStrictEqual({
      shoppingCart: testShoppingCart1,
      setShoppingCart: expect.any(Function),
    });
  });

  it('should provide value when empty session storage', () => {
    const { shoppingCartContext } = renderProvider(<div>content</div>);
    expect(shoppingCartContext.value).toStrictEqual({
      shoppingCart: [],
      setShoppingCart: expect.any(Function),
    });
  });

  it('should be able to set shopping cart', () => {
    window.sessionStorage.setItem(
      'shoppingCart',
      JSON.stringify([testShoppingCartItem1])
    );
    const { shoppingCartContext } = renderProvider(<div>content</div>);
    act(() => {
      shoppingCartContext.value?.setShoppingCart(testShoppingCart1);
    });
    expect(shoppingCartContext.value).toStrictEqual({
      shoppingCart: testShoppingCart1,
      setShoppingCart: expect.any(Function),
    });
    expect(window.sessionStorage.getItem('shoppingCart')).toBe(
      JSON.stringify(testShoppingCart1)
    );
  });
});
