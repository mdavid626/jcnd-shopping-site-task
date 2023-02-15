import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import apolloConfig from './api';

const createServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer(apolloConfig);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return app;
};

export default createServer;
