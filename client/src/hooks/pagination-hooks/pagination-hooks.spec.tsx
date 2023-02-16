import { act } from 'react-dom/test-utils';
import { renderHookWithRouter } from '../../testing-library/render';
import { usePagination } from './pagination-hooks';

describe('pagination-hooks', () => {
  describe('usePagination', () => {
    const pageCases: [string, number][] = [
      ['1', 1],
      ['', 0],
      ['-1', 0],
      ['abc', 0],
    ];
    it.each(pageCases)(
      'should return current page for "%s" page in URL',
      (pageInUrl, page) => {
        const { result } = renderHookWithRouter(
          () => usePagination(),
          undefined,
          [`/?page=${[pageInUrl]}`]
        );
        expect(result.current[0]).toBe(page);
      }
    );

    it('should be able to page forward', () => {
      const { result, router } = renderHookWithRouter(
        () => usePagination(),
        undefined,
        [`/?page=1&test=1`]
      );
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(2);
      expect(router.location?.pathname).toBe('/');
      expect(router.location?.search).toBe('?page=2&test=1');
    });

    it('should be able to page backwards', () => {
      const { result, router } = renderHookWithRouter(
        () => usePagination(),
        undefined,
        [`/?page=2&test=1`]
      );
      act(() => {
        result.current[2]();
      });
      expect(result.current[0]).toBe(1);
      expect(router.location?.pathname).toBe('/');
      expect(router.location?.search).toBe('?page=1&test=1');
    });
  });
});
