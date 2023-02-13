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

const products = [
  {
    id: 'testId1',
    category: 0,
    price: 1.2,
    name: 'test product1',
    amountInStockAvailable: 4,
  },
  {
    id: 'testId2',
    category: 0,
    price: 1.5,
    name: 'test product2',
    amountInStockAvailable: 2,
  },
];

const resolvers = {
  Query: {
    products: () => {
      return products;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
