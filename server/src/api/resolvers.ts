import productsDomain from '../domain/products/products';
import ordersDomain from '../domain/orders/orders';
import { ProductCategory } from '../types/product';
import { OrderRequestItem } from '../types/order';
import { PositiveIntResolver, NonNegativeIntResolver } from 'graphql-scalars';

const resolvers = {
  PositiveInt: PositiveIntResolver,
  NonNegativeInt: NonNegativeIntResolver,
  Query: {
    products: async (
      _: unknown,
      { category, page }: { category: ProductCategory; page: number }
    ) => productsDomain.getProducts(category, page),
  },
  Mutation: {
    placeOrder: async (
      _: unknown,
      { items }: { items: OrderRequestItem[] }
    ) => {
      if (items.length === 0) {
        throw new Error('Missing items');
      }
      const newOrder = await ordersDomain.placeOrder(items);
      return newOrder._id;
    },
  },
};

export default resolvers;
