const typeDefs = `#graphql
  scalar PositiveInt
  scalar NonNegativeInt

  type PageInfo {
    page: NonNegativeInt!
    numberOfPages: NonNegativeInt!
  }
  
  enum ProductCategory {
    VEGETABLES
    FRUITS
    CHEESE
  }

  type Product {
    id: String!
    priceInCents: NonNegativeInt!
    name: String!
    inStock: NonNegativeInt!
  }
  
  type ProductsQueryResult {
    nodes: [Product!]!
    pageInfo: PageInfo!
  }

  type Query {
    products(category: ProductCategory!, page: NonNegativeInt!): ProductsQueryResult!
  }
  
  input OrderItem {
    productId: String!
    amount: PositiveInt!
  }
  
  type Mutation {
    placeOrder(items: [OrderItem!]!): String!
  }
`;

export default typeDefs;
