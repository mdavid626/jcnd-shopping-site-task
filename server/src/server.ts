import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import apolloConfig from './api';

const createServer = async () => {
  const app = express();
  // to make loading spinners visible in the UI
  // only for convenience for this testing project!!!
  app.use((req, res, next) => {
    setTimeout(next, 500);
  });
  const apolloServer = new ApolloServer(apolloConfig);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return app;
};

export default createServer;
