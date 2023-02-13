import productsDomain from './domain/products';
import { ProductCategory } from './types/product';

const typeDefs = `#graphql
  enum ProductCategory {
    VEGETABLES
    FRUITS
    CHEESE
  }

  type Product {
    id: String!
    price: Float!
    name: String!
    amountInStockAvailable: Int!
  }

  type Query {
    products(category: ProductCategory!): [Product]
  }
`;

const resolvers = {
  Query: {
    products: (_: unknown, variables: { category: ProductCategory }) =>
      productsDomain.getProducts(variables.category),
  },
};

export default {
  typeDefs,
  resolvers,
};
