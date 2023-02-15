import express from 'express';
import mongoose, { connect } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './api/resolvers';
import typeDefs from './api/type-defs';

const start = async () => {
  mongoose.set('strictQuery', false);
  await connect('mongodb://127.0.0.1:27017/jacando-shop');

  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  await new Promise((resolve) =>
    app.listen({ port: 5002 }, () => resolve(undefined))
  );
  console.log('🚀 Listening on port 5002');
};

start();
