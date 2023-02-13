import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import ProductsPage from '../pages/products-page/products-page';
import { renderWithRouter } from '../testing-library/render';
import Routes from './routes';

jest.mock('../pages/products-page/products-page');

describe('routes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
    (ProductsPage as jest.Mock).mockReturnValue(<div>products-page</div>);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  const pages: string[] = ['/vegetables', '/fruits', '/cheese'];
  it.each(pages)('should render "%s" page', (page) => {
    const { asFragment } = renderWithRouter(<Routes />, undefined, [page]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render default page when unknown route', () => {
    renderWithRouter(<Routes />, undefined, ['/unknown']);
    expect(screen.getByText('issues-page')).toBeVisible();
  });

  it('should throw error on error route', () => {
    expect(() => renderWithRouter(<Routes />, undefined, ['/error'])).toThrow(
      'test error'
    );
  });
});
