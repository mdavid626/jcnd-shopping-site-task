import { waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { productsQueryResult } from '../../test-data/query-results';
import { renderHookWithQueryClient } from '../../testing-library/render';
import { useProducts } from './product-hooks';

describe('product-hooks', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(jest.resetAllMocks);

  describe('useProducts', () => {
    it('should return products', async () => {
      fetchMock.mockResponse(JSON.stringify(productsQueryResult));
      const { result } = renderHookWithQueryClient(() =>
        useProducts('VEGETABLES', 1)
      );
      expect(result.current).toStrictEqual([undefined, undefined]);
      await waitFor(() => {
        expect(result.current).toStrictEqual([expect.any(Object), undefined]);
      });
      expect(result.current[0]).toMatchSnapshot('query result');
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock.mock.calls[0]).toMatchSnapshot('query');
    });

    it('should error when error', async () => {
      fetchMock.mockRejectedValue(new Error('test error'));
      const { result } = renderHookWithQueryClient(() =>
        useProducts('VEGETABLES', 1)
      );
      expect(result.current).toStrictEqual([undefined, undefined]);
      await waitFor(() => {
        expect(result.current).toStrictEqual([undefined, expect.any(Error)]);
      });
    });
  });
});
