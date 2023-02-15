import { Order, OrderItem, OrderRequestItem } from '../types/order';
import { Types } from 'mongoose';

export const testOrderRequestItems1: OrderRequestItem[] = [
  { productId: '63ea6485732ff5cf8b36442c', amount: 2 },
  { productId: '63ea6485732ff5cf8b36442d', amount: 4 },
  { productId: '63ea6485732ff5cf8b36442e', amount: 6 },
];

const testOrderItem1: OrderItem = {
  productId: new Types.ObjectId('63ea6485732ff5cf8b36442c'),
  amount: 12,
};

const testOrderItem2: OrderItem = {
  productId: new Types.ObjectId('63ea6485732ff5cf8b36442e'),
  amount: 36,
};

export const testOrder1: Order = {
  _id: new Types.ObjectId('63ecfa3c091820c1978f8367'),
  items: [testOrderItem1, testOrderItem2],
  createdAt: new Date('2023-02-15T16:21:28.519Z'),
  updatedAt: new Date('2023-02-16T16:21:28.520Z'),
};
