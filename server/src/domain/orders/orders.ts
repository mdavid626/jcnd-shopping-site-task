import OrderModel from '../../models/order';
import { Order, OrderRequestItem } from '../../types/order';
import { Types } from 'mongoose';

const placeOrder = async (
  orderRequestItems: OrderRequestItem[]
): Promise<Order> => {
  const newOrder = await new OrderModel({
    items: orderRequestItems.map((item) => ({
      productId: new Types.ObjectId(item.productId),
      amount: item.amount,
    })),
  }).save();
  return newOrder.toObject();
};

export default {
  placeOrder,
};
