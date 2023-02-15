import request from 'supertest';
import createServer from '../server';
import productsDomain from '../domain/products/products';
import ordersDomain from '../domain/orders/orders';
import {
  emptyPlaceOrderQuery1,
  placeOrderQuery1,
  productsQuery1,
} from '../test-data/queries';
import { testProductsQueryResult1 } from '../test-data/products';
import { Express } from 'express';
import { testOrder1 } from '../test-data/orders';

jest.mock('../domain/products/products');
jest.mock('../domain/orders/orders');

describe('api', () => {
  let app: Express;
  beforeAll(async () => {
    app = await createServer();
  });
  afterEach(jest.resetAllMocks);

  describe('products', () => {
    it('should return products', async () => {
      (productsDomain.getProducts as jest.Mock).mockReturnValue(
        testProductsQueryResult1
      );
      const { body } = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(productsQuery1)
        .expect(200);
      expect(body).toMatchSnapshot();
      expect(productsDomain.getProducts).toHaveBeenCalledWith('VEGETABLES', 0);
    });

    it('should return 500 when internal error', async () => {
      (productsDomain.getProducts as jest.Mock).mockRejectedValue(
        new Error('test error')
      );
      const { body } = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(productsQuery1)
        .expect(200);
      expect(body.errors[0].message).toBe('test error');
      expect(body.data).toBe(null);
    });
  });

  describe('orders', () => {
    it('should place order', async () => {
      (ordersDomain.placeOrder as jest.Mock).mockReturnValue(testOrder1);
      const { body } = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(placeOrderQuery1)
        .expect(200);
      expect(body).toStrictEqual({
        data: { placeOrder: '63ecfa3c091820c1978f8367' },
      });
      expect(ordersDomain.placeOrder).toHaveBeenCalledWith([
        { amount: 2, productId: '63ea6485732ff5cf8b36442c' },
        { amount: 1, productId: '63ea6485732ff5cf8b36442d' },
      ]);
    });

    it('should fail when no items in order', async () => {
      (ordersDomain.placeOrder as jest.Mock).mockReturnValue(testOrder1);
      const { body } = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(emptyPlaceOrderQuery1)
        .expect(200);
      expect(body.errors[0].message).toBe('Missing items');
      expect(body.data).toBe(null);
      expect(ordersDomain.placeOrder).not.toHaveBeenCalled();
    });

    it('should return 500 when internal error', async () => {
      (ordersDomain.placeOrder as jest.Mock).mockRejectedValue(
        new Error('test error')
      );
      const { body } = await request(app)
        .post('/graphql')
        .set('Content-Type', 'application/json')
        .send(placeOrderQuery1)
        .expect(200);
      expect(body.errors[0].message).toBe('test error');
      expect(body.data).toBe(null);
    });
  });
});
