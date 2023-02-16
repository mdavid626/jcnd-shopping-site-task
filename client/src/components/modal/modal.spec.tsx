import { cleanup, render } from '@testing-library/react';
import React from 'react';
import Modal from './modal';

describe('modal', () => {
  afterEach(cleanup);

  it('should render', () => {
    const { asFragment } = render(
      <>
        <Modal>
          <div>content</div>
        </Modal>
        <div id="modal-root" data-testid="modal-root"></div>
      </>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
