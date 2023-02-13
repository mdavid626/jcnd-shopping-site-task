import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import apolloServerConfig from './apollo-server-config';

const start = async () => {
  const app = express();
  const apolloServer = new ApolloServer(apolloServerConfig);
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  await new Promise((resolve) =>
    app.listen({ port: 5002 }, () => resolve(undefined))
  );
  console.log('🚀 Listening on port 5002');
};

start();
