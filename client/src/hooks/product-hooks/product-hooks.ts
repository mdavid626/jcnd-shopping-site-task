import { ApolloError, gql, useQuery } from '@apollo/client';
import { ProductCategory, ProductsQueryResult } from '../../types/products';

export const GetProductsQuery = gql`
  query GetProductsQuery($category: ProductCategory!, $page: NonNegativeInt!) {
    products(category: $category, page: $page) {
      nodes {
        id
        priceInCents
        name
        inStock
      }
      pageInfo {
        page
        numberOfPages
      }
    }
  }
`;

export const useProducts = (
  category: ProductCategory,
  currentPage: number
): [ProductsQueryResult | undefined, ApolloError | undefined] => {
  const { data, error } = useQuery<ProductsQueryResult>(GetProductsQuery, {
    variables: {
      category,
      page: currentPage,
    },
    notifyOnNetworkStatusChange: true,
  });
  return [data, error];
};
