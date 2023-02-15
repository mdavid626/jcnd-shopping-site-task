import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {
  useAddToShoppingCart,
  useAvailableInStock,
} from '../../hooks/shopping-car-thooks/shopping-cart-hooks';
import { testProduct1 } from '../../test-data/products';
import ProductItem from './product-item';

jest.mock('../../hooks/shopping-car-thooks/shopping-cart-hooks');

describe('product-item', () => {
  beforeEach(() => {
    (useAddToShoppingCart as jest.Mock).mockReturnValue(jest.fn());
    (useAvailableInStock as jest.Mock).mockReturnValue(12);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const { asFragment } = render(<ProductItem product={testProduct1} />);
    expect(asFragment()).toMatchSnapshot();
    expect(useAddToShoppingCart).toHaveBeenCalledWith();
    expect(useAvailableInStock).toHaveBeenCalledWith(testProduct1);
  });

  it('should not render buy button when not available in stock', () => {
    (useAvailableInStock as jest.Mock).mockReturnValue(0);
    render(<ProductItem product={testProduct1} />);
    expect(screen.queryByText('Buy')).toBe(null);
  });

  it('should add to shopping cart when buy button clicked', async () => {
    const addToShoppingCart = jest.fn();
    (useAddToShoppingCart as jest.Mock).mockReturnValue(addToShoppingCart);
    render(<ProductItem product={testProduct1} />);
    await userEvent.click(screen.getByText('Buy'));
    expect(addToShoppingCart).toHaveBeenCalledWith(testProduct1);
  });
});
