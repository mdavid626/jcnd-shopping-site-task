import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  useAddToShoppingCart,
  useRemoveFromShoppingCart,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { testShoppingCartItem1 } from '../../test-data/shopping-cart';
import { ShoppingCartItem } from '../../types/shopping-cart';
import ShoppingCartListItem from './shopping-cart-list-item';

jest.mock('../../hooks/shopping-car-thooks/shopping-cart-hooks');
describe('shopping-cart-list-item', () => {
  beforeEach(() => {
    (useAddToShoppingCart as jest.Mock).mockReturnValue(jest.fn());
    (useRemoveFromShoppingCart as jest.Mock).mockReturnValue(jest.fn());
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(
      <ShoppingCartListItem shoppingCartItem={testShoppingCartItem1} />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(useAddToShoppingCart).toHaveBeenCalledWith();
    expect(useRemoveFromShoppingCart).toHaveBeenCalledWith();
  });

  it('should disable add more button when no more in stock', () => {
    const shoppingCartItem: ShoppingCartItem = {
      ...testShoppingCartItem1,
      amount: testShoppingCartItem1.product.inStock,
    };
    render(<ShoppingCartListItem shoppingCartItem={shoppingCartItem} />);
    expect(screen.getByText('add')).toHaveClass(
      'ShoppingCartListItem-button--disabled'
    );
  });

  it('should add more amount when add more button clicked', async () => {
    const addToShoppingCart = jest.fn();
    (useAddToShoppingCart as jest.Mock).mockReturnValue(addToShoppingCart);
    render(<ShoppingCartListItem shoppingCartItem={testShoppingCartItem1} />);
    await userEvent.click(screen.getByText('add'));
    expect(addToShoppingCart).toHaveBeenCalledWith(
      testShoppingCartItem1.product
    );
  });

  it('should remove amount when remove button clicked', async () => {
    const removeFromShoppingCart = jest.fn();
    (useRemoveFromShoppingCart as jest.Mock).mockReturnValue(
      removeFromShoppingCart
    );
    render(<ShoppingCartListItem shoppingCartItem={testShoppingCartItem1} />);
    await userEvent.click(screen.getByText('remove'));
    expect(removeFromShoppingCart).toHaveBeenCalledWith(
      testShoppingCartItem1.product
    );
  });
});
