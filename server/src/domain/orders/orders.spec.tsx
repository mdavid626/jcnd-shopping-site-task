import MockDate from 'mockdate';

import mongoose, { connect, Types } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ordersDomain from './orders';
import { testOrderRequestItems1 } from '../../test-data/orders';
import OrderModel from '../../models/order';

describe('ordersDomain', () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    mongoose.set('strictQuery', false);
    await connect(mongod.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongod?.stop();
  });
  beforeEach(async () => {
    MockDate.set(new Date('2023-02-15T16:21:28.519Z'));
    await OrderModel.deleteMany({});
  });
  afterEach(() => {
    MockDate.reset;
  });

  describe('placeOrder', () => {
    it('should store order', async () => {
      const order = await ordersDomain.placeOrder(testOrderRequestItems1);
      expect(order).toStrictEqual({
        _id: order._id,
        createdAt: new Date('2023-02-15T16:21:28.519Z'),
        items: [
          {
            amount: 2,
            productId: new Types.ObjectId('63ea6485732ff5cf8b36442c'),
          },
          {
            amount: 4,
            productId: new Types.ObjectId('63ea6485732ff5cf8b36442d'),
          },
          {
            amount: 6,
            productId: new Types.ObjectId('63ea6485732ff5cf8b36442e'),
          },
        ],
        updatedAt: new Date('2023-02-15T16:21:28.519Z'),
      });
      const orders = await OrderModel.find({}).lean();
      expect(orders).toStrictEqual([order]);
    });
  });
});
