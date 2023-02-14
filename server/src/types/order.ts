import { Types } from 'mongoose';

export type OrderItem = {
  productId: Types.ObjectId | string;
  amount: number;
};

export type Order = {
  items: OrderItem[];
};
