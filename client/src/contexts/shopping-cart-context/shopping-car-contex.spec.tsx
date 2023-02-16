import { render } from '@testing-library/react';
import { useContext } from 'react';
import { ShoppingCartContextValue } from '../../types/shopping-cart';
import ShoppingCartContext from './shopping-cart-context';

describe('shopping-cart-context', () => {
  it('should have value', () => {
    let shoppingCartContextValue: ShoppingCartContextValue | undefined =
      undefined;
    const Component = () => {
      shoppingCartContextValue = useContext(ShoppingCartContext);
      return null;
    };
    render(<Component />);
    expect(shoppingCartContextValue).toStrictEqual({
      shoppingCart: [],
      setShoppingCart: expect.any(Function),
    });
  });
});
