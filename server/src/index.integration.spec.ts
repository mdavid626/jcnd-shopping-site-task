import { Express } from 'express';
import createServer from './server';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { connect, Types } from 'mongoose';
import MockDate from 'mockdate';
import OrderModel from './models/order';
import request from 'supertest';
import { placeOrderQuery1, productsQuery1 } from './test-data/queries';

describe('[Integration] app', () => {
  let app: Express;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    app = await createServer();
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

  it('should return products', async () => {
    const { body } = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send(productsQuery1)
      .expect(200);
    expect(body).toMatchSnapshot();
  });

  it('should be able to place order', async () => {
    const { body } = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .send(placeOrderQuery1)
      .expect(200);
    const orders = await OrderModel.find({}).lean();
    expect(orders).toHaveLength(1);
    expect(body).toStrictEqual({
      data: { placeOrder: orders[0]._id.toString() },
    });
    expect(orders[0]).toStrictEqual({
      _id: orders[0]._id,
      createdAt: new Date('2023-02-15T16:21:28.519Z'),
      items: [
        {
          amount: 2,
          productId: new Types.ObjectId('63ea6485732ff5cf8b36442c'),
        },
        {
          amount: 1,
          productId: new Types.ObjectId('63ea6485732ff5cf8b36442d'),
        },
      ],
      updatedAt: new Date('2023-02-15T16:21:28.519Z'),
    });
  });
});
