import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';
import PageLoader from './page-loader';

describe('page-loader', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <PageLoader>{() => <div>content</div>}</PageLoader>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render spinner', () => {
    const { asFragment } = render(
      <PageLoader isLoading>{() => <div>content</div>}</PageLoader>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render error', () => {
    const { asFragment } = render(
      <PageLoader errorMessage="my error message">
        {() => <div>content</div>}
      </PageLoader>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render error when both loading and error', () => {
    render(
      <PageLoader errorMessage="my error message" isLoading>
        {() => <div>content</div>}
      </PageLoader>
    );
    expect(screen.getByText('my error message')).toBeVisible();
    expect(screen.queryByTestId('PageLoader-spinner')).toBe(null);
  });
});
