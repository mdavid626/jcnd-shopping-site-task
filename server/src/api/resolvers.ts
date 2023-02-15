import productsDomain from '../domain/products/products';
import ordersDomain from '../domain/orders/orders';
import { ProductCategory } from '../types/product';
import { OrderRequestItem } from '../types/order';

const resolvers = {
  Query: {
    products: async (
      _: unknown,
      { category, page }: { category: ProductCategory; page: number }
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return productsDomain.getProducts(category, page);
    },
  },
  Mutation: {
    placeOrder: async (
      _: unknown,
      { items }: { items: OrderRequestItem[] }
    ) => {
      if (items.length === 0) {
        throw new Error('Missing items');
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newOrder = await ordersDomain.placeOrder(items);
      return newOrder._id;
    },
  },
};

export default resolvers;
