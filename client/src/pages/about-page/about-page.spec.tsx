import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import AboutPage from './about-page';

jest.mock('../../components/header/header');
jest.mock('../../components/footer/footer');

describe('about-page', () => {
  afterEach(cleanup);
  afterEach(jest.resetAllMocks);

  it('should render', () => {
    (Header as jest.Mock).mockReturnValue(<div>header</div>);
    (Footer as jest.Mock).mockReturnValue(<div>footer</div>);
    const { asFragment } = render(<AboutPage />);
    expect(asFragment()).toMatchSnapshot();
    expect(Header).toHaveBeenCalledWith({}, {});
    expect(Footer).toHaveBeenCalledWith({}, {});
  });
});
