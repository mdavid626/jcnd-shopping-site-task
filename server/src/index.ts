import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import apolloServerConfig from './apollo-server-config';

const app = express();
const apolloServer = new ApolloServer(apolloServerConfig);

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });
});

app.listen(5002, () => {
  console.log('🚀 Listening on port 5002');
});
