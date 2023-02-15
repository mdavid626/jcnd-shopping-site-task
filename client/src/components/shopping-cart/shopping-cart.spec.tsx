import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  usePlaceOrder,
  useShoppingCart,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { testShoppingCart1 } from '../../test-data/shopping-cart';
import ShoppingCartListItem from '../shopping-cart-list-item/shopping-cart-list-item';
import ShoppingCart from './shopping-cart';

jest.mock('../../hooks/shopping-car-thooks/shopping-cart-hooks');
jest.mock('../shopping-cart-list-item/shopping-cart-list-item');

describe('shopping-cart', () => {
  beforeEach(() => {
    (ShoppingCartListItem as jest.Mock).mockReturnValue(
      <div>shopping-cart-list-item</div>
    );
    (useShoppingCart as jest.Mock).mockReturnValue([
      testShoppingCart1,
      jest.fn(),
    ]);
    (usePlaceOrder as jest.Mock).mockReturnValue([jest.fn(), false]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(<ShoppingCart onClose={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
    expect(useShoppingCart).toHaveBeenCalledWith();
    expect(usePlaceOrder).toHaveBeenCalledWith();
    expect(ShoppingCartListItem).toHaveBeenCalledTimes(2);
    expect(ShoppingCartListItem).toHaveBeenCalledWith(
      { shoppingCartItem: testShoppingCart1[0] },
      {}
    );
    expect(ShoppingCartListItem).toHaveBeenCalledWith(
      { shoppingCartItem: testShoppingCart1[1] },
      {}
    );
  });

  it('should render message when no items in shopping cart', () => {
    (useShoppingCart as jest.Mock).mockReturnValue([[], jest.fn()]);
    render(<ShoppingCart onClose={jest.fn()} />);
    expect(screen.getByText('Your shopping cart is empty')).toBeVisible();
    expect(screen.queryByTestId('ShoppingCart-total')).toBe(null);
    expect(screen.queryByText('Place order')).toBe(null);
    expect(ShoppingCartListItem).not.toHaveBeenCalled();
  });

  it('should close when close button clicked', async () => {
    const handleClose = jest.fn();
    render(<ShoppingCart onClose={handleClose} />);
    await userEvent.click(screen.getByText('close'));
    expect(handleClose).toHaveBeenCalledWith();
  });

  it('should place order when place order button clicked', async () => {
    const placeOrder = jest.fn().mockResolvedValue(undefined);
    (usePlaceOrder as jest.Mock).mockReturnValue([placeOrder, false]);
    const handleClose = jest.fn();
    render(<ShoppingCart onClose={handleClose} />);
    await userEvent.click(screen.getByText('Place order'));
    expect(placeOrder).toHaveBeenCalledWith();
    expect(handleClose).toHaveBeenCalledWith();
  });

  it('should show loading text when placing order', async () => {
    (usePlaceOrder as jest.Mock).mockReturnValue([jest.fn(), true]);
    render(<ShoppingCart onClose={jest.fn()} />);
    expect(screen.getByText('Placing order...')).toBeVisible();
    expect(screen.queryByText('Place order')).toBe(null);
  });
});
