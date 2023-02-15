import mongoose, { connect } from 'mongoose';
import createServer from './server';

const start = async () => {
  mongoose.set('strictQuery', false);
  await connect('mongodb://127.0.0.1:27017/jacando-shop');

  const app = await createServer();
  await new Promise((resolve) =>
    app.listen({ port: 5002 }, () => resolve(undefined))
  );
  console.log('🚀 Listening on port 5002');
};

start();
