export const productsQuery1 = {
  operationName: 'GetProductsQuery',
  variables: { category: 'VEGETABLES', page: 0 },
  query:
    'query GetProductsQuery($category: ProductCategory!, $page: NonNegativeInt!) {\n  products(category: $category, page: $page) {\n    nodes {\n      id\n      priceInCents\n      name\n      inStock\n      __typename\n    }\n    pageInfo {\n      page\n      numberOfPages\n      __typename\n    }\n    __typename\n  }\n}',
};

export const placeOrderQuery1 = {
  operationName: 'PlaceOrder',
  variables: {
    items: [
      { productId: '63ea6485732ff5cf8b36442c', amount: 2 },
      { productId: '63ea6485732ff5cf8b36442d', amount: 1 },
    ],
  },
  query:
    'mutation PlaceOrder($items: [OrderItem!]!) {\n  placeOrder(items: $items)\n}',
};

export const emptyPlaceOrderQuery1 = {
  operationName: 'PlaceOrder',
  variables: {
    items: [],
  },
  query:
    'mutation PlaceOrder($items: [OrderItem!]!) {\n  placeOrder(items: $items)\n}',
};
