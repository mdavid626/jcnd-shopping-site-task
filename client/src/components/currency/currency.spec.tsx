import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Currency from './currency';

describe('currency', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(<Currency priceInCents={156945} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
