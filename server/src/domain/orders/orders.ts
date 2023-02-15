import OrderModel from '../../models/order';
import { Order } from '../../types/order';

const placeOrder = async (order: Order) => {
  const newOrder = await new OrderModel(order).save();
  return newOrder.toObject();
};

export default {
  placeOrder,
};
