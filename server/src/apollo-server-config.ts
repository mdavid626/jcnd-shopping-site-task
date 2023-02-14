import productsDomain from './domain/products';
import ordersDomain from './domain/orders';
import { ProductCategory } from './types/product';
import { Order } from './types/order';
import orders from './domain/orders';
import { Types } from 'mongoose';

const typeDefs = `#graphql
  enum ProductCategory {
    VEGETABLES
    FRUITS
    CHEESE
  }
  
  type PageInfo {
    page: Int!
    numberOfPages: Int!
  }

  type Product {
    id: String!
    price: Float!
    name: String!
    inStock: Int!
  }
  
  type ProductsQueryResult {
    nodes: [Product]
    pageInfo: PageInfo
  }

  type Query {
    products(category: ProductCategory!, page: Int!): ProductsQueryResult
  }
  
  input OrderItem {
    productId: String!
    amount: Int!
  }
  
  input Order {
    items: [OrderItem]
  }
  
  type Mutation {
    placeOrder(order: Order): String!
  }
`;

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
      const newOrder = await orders.placeOrder({
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

export default {
  typeDefs,
  resolvers,
};
