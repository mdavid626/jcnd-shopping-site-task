import { cleanup, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import Routes from '../../router/routes';
import {
  placeOrderQueryResult1,
  productsQueryResult,
} from '../../test-data/query-results';
import { renderWithFullContext } from '../../testing-library/render';

describe('[Acceptance] products-page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify(productsQueryResult));
    fetchMock.mockResponseOnce(JSON.stringify(placeOrderQueryResult1));
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should be able see products', async () => {
    renderWithFullContext(<Routes />);

    await screen.findByText('Broccoli');
    const product1 = screen.getByTestId('ProductItem-63ea6485732ff5cf8b364431');
    expect(within(product1).getByText('In stock: 466')).toBeVisible();

    expect(screen.getByText('Cabbage')).toBeVisible();
    const product2 = screen.getByTestId('ProductItem-63ea6485732ff5cf8b364434');
    expect(within(product2).getByText('In stock: 200')).toBeVisible();
  });

  it('should be able to buy product', async () => {
    renderWithFullContext(<Routes />);
    await screen.findByText('Broccoli');

    const product1 = screen.getByTestId('ProductItem-63ea6485732ff5cf8b364431');
    expect(within(product1).getByText('In stock: 466')).toBeVisible();
    await userEvent.click(within(product1).getByText('Buy'));
    expect(within(product1).getByText('In stock: 465')).toBeVisible();

    expect(screen.getByText('Cabbage')).toBeVisible();
    const product2 = screen.getByTestId('ProductItem-63ea6485732ff5cf8b364434');
    expect(within(product2).getByText('In stock: 200')).toBeVisible();
    await userEvent.click(within(product2).getByText('Buy'));
    expect(within(product2).getByText('In stock: 199')).toBeVisible();
    await userEvent.click(within(product2).getByText('Buy'));
    expect(within(product2).getByText('In stock: 198')).toBeVisible();

    await userEvent.click(screen.getByAltText('cart'));
    await screen.findByText('Shopping Cart');
    const modal = screen.getByTestId('modal-root');
    expect(within(modal).getByText('Broccoli')).toBeVisible();
    expect(within(modal).getByText('Cabbage')).toBeVisible();
    expect(within(modal).getByText('Total: 273,77 €')).toBeVisible();
    await userEvent.click(within(modal).getByText('Place order'));

    await screen.findByText('Order placed, thank you!');
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1]).toMatchSnapshot();
  });
});
