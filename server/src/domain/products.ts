import { ProductCategory } from '../types/product';
import sampleProducts from './sample-products';

const getProducts = (category: ProductCategory) => {
  return sampleProducts.filter((product) => product.category === category);
};

export default {
  getProducts,
};
