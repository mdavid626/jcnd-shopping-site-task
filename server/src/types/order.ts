import { Types } from 'mongoose';

export type OrderItem = {
  productId: Types.ObjectId;
  amount: number;
};

export type Order = {
  _id: Types.ObjectId;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
};

export type OrderRequestItem = {
  productId: string;
  amount: number;
};
