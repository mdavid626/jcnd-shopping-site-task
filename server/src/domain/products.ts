import { ProductCategory, ProductsQueryResult } from '../types/product';
import sampleProducts from './sample-products';
import { PageInfo } from '../types/page-info';

const pageSize = 5;

const getProducts = (
  category: ProductCategory,
  page: number
): ProductsQueryResult => {
  const allProductsForCategory = sampleProducts.filter(
    (product) => product.category === category
  );
  const products = allProductsForCategory
    .slice(page * pageSize)
    .slice(0, pageSize);
  const pageInfo: PageInfo = {
    page,
    numberOfPages: Math.ceil(allProductsForCategory.length / pageSize),
  };
  return {
    nodes: products,
    pageInfo,
  };
};

export default {
  getProducts,
};
