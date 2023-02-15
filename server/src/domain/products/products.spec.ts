import productsDomain from './products';
import { ProductCategory } from '../../types/product';

describe('productsDomain', () => {
  describe('getProducts', () => {
    const cases: [ProductCategory, number][] = [
      ['VEGETABLES', 0],
      ['VEGETABLES', 1],
      ['VEGETABLES', 14],
      ['FRUITS', 0],
      ['FRUITS', 1],
      ['FRUITS', 5],
      ['CHEESE', 0],
      ['CHEESE', 1],
      ['CHEESE', 6],
    ];
    it.each(cases)(
      'should return paginated products for %s category and %s page',
      (category, page) => {
        const products = productsDomain.getProducts(category, page);
        expect(products).toMatchSnapshot();
      }
    );
  });
});
