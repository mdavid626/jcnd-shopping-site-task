import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import ProductsPage from '../pages/products-page/products-page';
import ThankYouPage from '../pages/thank-you-page/thank-you-page';
import { renderWithRouter } from '../testing-library/render';
import { ProductCategory } from '../types/products';
import Routes from './routes';

jest.mock('../pages/products-page/products-page');
jest.mock('../pages/thank-you-page/thank-you-page');

describe('routes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
    (ProductsPage as jest.Mock).mockImplementation(
      ({ category }: { category: ProductCategory }) => (
        <div>products-page-{category}</div>
      )
    );
    (ThankYouPage as jest.Mock).mockReturnValue(<div>thank-you-page</div>);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  const pages: string[] = ['/vegetables', '/fruits', '/cheese', '/thank-you'];
  it.each(pages)('should render "%s" page', (page) => {
    const { asFragment } = renderWithRouter(<Routes />, undefined, [page]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render default page when unknown route', () => {
    renderWithRouter(<Routes />, undefined, ['/unknown']);
    expect(screen.getByText('products-page-VEGETABLES')).toBeVisible();
  });

  it('should throw error on error route', () => {
    expect(() => renderWithRouter(<Routes />, undefined, ['/error'])).toThrow(
      'test error'
    );
  });
});
