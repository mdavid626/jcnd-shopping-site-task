import { Schema, model } from 'mongoose';
import { Order, OrderItem } from '../types/order';

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
  },
  {
    _id: false,
    versionKey: false,
  }
);

const orderSchema = new Schema<Order>(
  {
    items: [orderItemSchema],
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;
