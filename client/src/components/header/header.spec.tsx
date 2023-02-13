import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { renderWithRouter } from '../../testing-library/render';
import Header from './header';

describe('header', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = renderWithRouter(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should highlight about page when on about page', () => {
    renderWithRouter(<Header />, undefined, ['/about']);
    expect(screen.getByText('React GitHub Issues')).not.toHaveClass(
      'Header-selectedLink'
    );
    expect(screen.getByText('About')).toHaveClass('Header-selectedLink');
  });

  it('should highlight issues page when on issue detail page', () => {
    renderWithRouter(<Header />, undefined, ['/issue/1']);
    expect(screen.getByText('React GitHub Issues')).toHaveClass(
      'Header-selectedLink'
    );
    expect(screen.getByText('About')).not.toHaveClass('Header-selectedLink');
  });
});
