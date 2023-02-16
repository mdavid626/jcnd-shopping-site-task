import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { ReactNode } from 'react';
import Modal from '../modal/modal';
import ShoppingCart from '../shopping-cart/shopping-cart';
import ShoppingCartButton from './shopping-cart-button';

jest.mock('../modal/modal');
jest.mock('../shopping-cart/shopping-cart');

describe('shopping-cart-button', () => {
  beforeEach(() => {
    (ShoppingCart as jest.Mock).mockReturnValue(<div>shopping-cart</div>);
    (Modal as jest.Mock).mockImplementation(
      ({ children }: { children: ReactNode }) => <div>modal: {children}</div>
    );
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(<ShoppingCartButton />);
    expect(asFragment()).toMatchSnapshot();
    expect(Modal).not.toHaveBeenCalled();
    expect(ShoppingCart).not.toHaveBeenCalled();
  });

  it('should open modal when clicked', async () => {
    render(<ShoppingCartButton />);
    await userEvent.click(screen.getByAltText('cart'));
    expect(screen.getByText('shopping-cart')).toBeVisible();
    expect(screen.getByText('modal:')).toBeVisible();
    expect(Modal).toHaveBeenCalledWith({ children: expect.any(Object) }, {});
    expect(ShoppingCart).toHaveBeenCalledWith(
      { onClose: expect.any(Function) },
      {}
    );
  });

  it('should close modal when close function called', async () => {
    render(<ShoppingCartButton />);
    await userEvent.click(screen.getByAltText('cart'));
    expect(screen.getByText('shopping-cart')).toBeVisible();
    act(() => {
      (ShoppingCart as jest.Mock).mock.calls[0][0].onClose();
    });
    expect(screen.queryByText('shopping-cart')).toBe(null);
  });
});
