const typeDefs = `#graphql
  type PageInfo {
    page: Int!
    numberOfPages: Int!
  }
  
  enum ProductCategory {
    VEGETABLES
    FRUITS
    CHEESE
  }

  type Product {
    id: String!
    price: Float!
    name: String!
    inStock: Int!
  }
  
  type ProductsQueryResult {
    nodes: [Product!]!
    pageInfo: PageInfo!
  }

  type Query {
    products(category: ProductCategory!, page: Int!): ProductsQueryResult!
  }
  
  input OrderItem {
    productId: String!
    amount: Int!
  }
  
  type Mutation {
    placeOrder(items: [OrderItem!]!): String!
  }
`;

export default typeDefs;
