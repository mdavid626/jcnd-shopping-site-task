import { ApolloError, gql, useQuery } from '@apollo/client';
import { useCallback } from 'react';
import { ProductCategory, ProductsQueryResult } from '../../types/products';

export const GetProductsQuery = gql`
  query GetProductsQuery($category: ProductCategory!) {
    products(category: $category) {
      id
      price
      name
      amountInStockAvailable
    }
  }
`;

export const useProducts = (
  category: ProductCategory
): [
  ProductsQueryResult | undefined,
  boolean,
  ApolloError | undefined,
  () => void
] => {
  const {
    data,
    loading,
    error,
    fetchMore: queryFetchMore,
  } = useQuery<ProductsQueryResult>(GetProductsQuery, {
    variables: {
      category,
    },
    notifyOnNetworkStatusChange: true,
  });
  const fetchMore = useCallback(
    () => queryFetchMore({}),
    [queryFetchMore, data]
  );
  return [data, loading, error, fetchMore];
};
