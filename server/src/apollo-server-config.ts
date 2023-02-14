import productsDomain from './domain/products';
import { ProductCategory } from './types/product';

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
};

export default {
  typeDefs,
  resolvers,
};
