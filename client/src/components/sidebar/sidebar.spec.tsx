import { cleanup, screen } from '@testing-library/react';
import React from 'react';
import { renderWithRouter } from '../../testing-library/render';
import Sidebar from './sidebar';

describe('sidebar', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = renderWithRouter(
      <Sidebar>
        <div>content</div>
      </Sidebar>,
      undefined,
      ['/vegetables']
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render custom className when passed', () => {
    renderWithRouter(
      <Sidebar className="myClassName">
        <div>content</div>
      </Sidebar>
    );
    expect(screen.getByTestId('Sidebar')).toHaveClass('myClassName');
  });
});
