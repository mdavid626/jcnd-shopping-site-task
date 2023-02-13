import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Footer from './footer';

describe('footer', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(<Footer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
