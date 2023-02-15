import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { testPageInfo1 } from '../../test-data/page-info';
import { PageInfo } from '../../types/page-info';
import Pagination from './pagination';

describe('pagination', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <Pagination
        pageInfo={testPageInfo1}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add custom className when passed', () => {
    render(
      <Pagination
        pageInfo={testPageInfo1}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
        className="myClassName"
      />
    );
    expect(screen.getByTestId('Pagination')).toHaveClass('myClassName');
  });

  it('should be disabled when no pageInfo', () => {
    render(<Pagination goNext={jest.fn()} goPrevious={jest.fn()} />);
    expect(screen.getByTitle('Go to previous page')).not.toHaveClass(
      'Pagination-arrow--enabled'
    );
    expect(screen.getByTitle('Go to next page')).not.toHaveClass(
      'Pagination-arrow--enabled'
    );
  });

  it('should disable go to previous page when on first page', () => {
    const pageInfo: PageInfo = {
      page: 0,
      numberOfPages: 5,
    };
    render(
      <Pagination
        pageInfo={pageInfo}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
      />
    );
    expect(screen.getByTitle('Go to previous page')).not.toHaveClass(
      'Pagination-arrow--enabled'
    );
    expect(screen.getByTitle('Go to next page')).toHaveClass(
      'Pagination-arrow--enabled'
    );
  });

  it('should disable go to next page when on last page', () => {
    const pageInfo: PageInfo = {
      page: 4,
      numberOfPages: 5,
    };
    render(
      <Pagination
        pageInfo={pageInfo}
        goNext={jest.fn()}
        goPrevious={jest.fn()}
      />
    );
    expect(screen.getByTitle('Go to previous page')).toHaveClass(
      'Pagination-arrow--enabled'
    );
    expect(screen.getByTitle('Go to next page')).not.toHaveClass(
      'Pagination-arrow--enabled'
    );
  });

  it('should go previous when go previous page clicked', async () => {
    const goPrevious = jest.fn();
    render(
      <Pagination
        pageInfo={testPageInfo1}
        goNext={jest.fn()}
        goPrevious={goPrevious}
      />
    );
    await userEvent.click(screen.getByTitle('Go to previous page'));
    expect(goPrevious).toHaveBeenCalledWith();
  });

  it('should go next when go next page clicked', async () => {
    const goNext = jest.fn();
    render(
      <Pagination
        pageInfo={testPageInfo1}
        goNext={goNext}
        goPrevious={jest.fn()}
      />
    );
    await userEvent.click(screen.getByTitle('Go to next page'));
    expect(goNext).toHaveBeenCalledWith();
  });
});
