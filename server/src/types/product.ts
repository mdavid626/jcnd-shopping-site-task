export type ProductCategory = 'VEGETABLES' | 'FRUITS' | 'CHEESE';

export type Product = {
  id: string;
  category: ProductCategory;
  price: number;
  name: string;
  amountInStockAvailable: number;
};
