import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import AboutPage from '../pages/about-page/about-page';
import ProductsPage from '../pages/products-page/products-page';
import { renderWithRouter } from '../testing-library/render';
import Routes from './routes';

jest.mock('../pages/products-page/products-page');
jest.mock('../pages/about-page/about-page');

describe('routes', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockReturnValue(undefined);
    (ProductsPage as jest.Mock).mockReturnValue(<div>products-page</div>);
    (AboutPage as jest.Mock).mockReturnValue(<div>about-page</div>);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  const pages: string[] = ['/', '/about'];
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
