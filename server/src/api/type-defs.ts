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

export default typeDefs;
