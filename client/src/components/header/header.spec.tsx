import { cleanup, render } from '@testing-library/react';
import React from 'react';
import ShoppingCartButton from '../shopping-cart-button/shopping-cart-button';
import Header from './header';

jest.mock('../shopping-cart-button/shopping-cart-button');

describe('header', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    (ShoppingCartButton as jest.Mock).mockReturnValue(
      <div>shopping-cart-button</div>
    );
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
