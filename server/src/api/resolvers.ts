import { Types } from 'mongoose';
import productsDomain from '../domain/products/products';
import ordersDomain from '../domain/orders/orders';
import { ProductCategory } from '../types/product';
import { Order } from '../types/order';

const resolvers = {
  Query: {
    products: async (
      _: unknown,
      variables: { category: ProductCategory; page: number }
    ) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return productsDomain.getProducts(variables.category, variables.page);
    },
  },
  Mutation: {
    placeOrder: async (_: unknown, { order }: { order: Order }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newOrder = await ordersDomain.placeOrder({
        ...order,
        items: order.items.map((item) => ({
          ...item,
          productId: new Types.ObjectId(item.productId),
        })),
      });
      return newOrder._id;
    },
  },
};

export default resolvers;
