export type ProductCategory = 'VEGETABLES' | 'FRUITS' | 'CHEESE';

export type Product = {
  id: string;
  price: number;
  name: string;
  amountInStockAvailable: number;
};

export type ProductsQueryResult = {
  products: Product[];
};
