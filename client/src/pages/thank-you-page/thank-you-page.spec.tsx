import { cleanup } from '@testing-library/react';
import React from 'react';
import Header from '../../components/header/header';
import { renderWithRouter } from '../../testing-library/render';
import ThankYouPage from './thank-you-page';

jest.mock('../../components/header/header');

describe('thank-you-page', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    const { asFragment } = renderWithRouter(<ThankYouPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Header).toHaveBeenCalledWith({}, {});
  });
});
