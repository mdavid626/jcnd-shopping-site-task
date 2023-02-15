import { cleanup, render, screen } from '@testing-library/react';
import React, { ReactNode } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import ProductItem from '../../components/product-item/product-item';
import Sidebar from '../../components/sidebar/sidebar';
import { usePagination } from '../../hooks/pagination-hooks/pagination-hooks';
import { useProducts } from '../../hooks/product-hooks/product-hooks';
import { testProductQueryResult1 } from '../../test-data/products';
import ProductsPage from './products-page';

jest.mock('../../components/footer/footer');
jest.mock('../../components/header/header');
jest.mock('../../components/pagination/pagination');
jest.mock('../../components/product-item/product-item');
jest.mock('../../components/sidebar/sidebar');
jest.mock('../../hooks/pagination-hooks/pagination-hooks');
jest.mock('../../hooks/product-hooks/product-hooks');

describe('products-page', () => {
  beforeEach(() => {
    (Footer as jest.Mock).mockReturnValue(<div>footer</div>);
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    (Pagination as jest.Mock).mockReturnValue(<div>pagination</div>);
    (ProductItem as jest.Mock).mockReturnValue(<div>product-item</div>);
    (Sidebar as jest.Mock).mockImplementation(
      ({ children }: { children: ReactNode }) => <div>sidebar {children}</div>
    );
    (usePagination as jest.Mock).mockReturnValue([1, jest.fn(), jest.fn()]);
    (useProducts as jest.Mock).mockReturnValue([
      testProductQueryResult1,
      undefined,
    ]);
  });
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    const goNext = jest.fn();
    const goPrevious = jest.fn();
    (usePagination as jest.Mock).mockReturnValue([1, goNext, goPrevious]);
    const { asFragment } = render(<ProductsPage category="VEGETABLES" />);
    expect(asFragment()).toMatchSnapshot();
    expect(usePagination).toHaveBeenCalledWith();
    expect(useProducts).toHaveBeenCalledWith('VEGETABLES', 1);
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
    expect(Pagination).toHaveBeenCalledWith(
      {
        pageInfo: testProductQueryResult1.products.pageInfo,
        goNext,
        goPrevious,
        className: 'ProductsPage-pagination',
      },
      {}
    );
    expect(ProductItem).toHaveBeenCalledTimes(2);
    expect(ProductItem).toHaveBeenCalledWith(
      { product: testProductQueryResult1.products.nodes[0] },
      {}
    );
    expect(ProductItem).toHaveBeenCalledWith(
      { product: testProductQueryResult1.products.nodes[1] },
      {}
    );
    expect(Sidebar).toHaveBeenCalledWith(
      { className: 'ProductsPage-sidebar', children: expect.any(Object) },
      {}
    );
  });

  it('should show spinner when loading', () => {
    (useProducts as jest.Mock).mockReturnValue([undefined, undefined]);
    const { asFragment } = render(<ProductsPage category="VEGETABLES" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show error when error', () => {
    (useProducts as jest.Mock).mockReturnValue([
      undefined,
      new Error('test error'),
    ]);
    render(<ProductsPage category="VEGETABLES" />);
    expect(screen.getByText('test error')).toBeVisible();
  });
});
