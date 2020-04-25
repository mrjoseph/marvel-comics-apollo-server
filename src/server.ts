import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import { DataSources } from "apollo-server-core/dist/graphqlOptions";
import compression from 'compression';
import cors from 'cors';
import  PersonalizationAPI, { IDataSources } from './dataSource';
import schema from './schema';
require('dotenv').config()
const app = express();
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  context: () => ({
    apikey: process.env.MARVEL_API_KEY,
    privateKey: process.env.MARVEL_PUBLIC_KEY,
    ts: Date.now(),
    }),
  dataSources: ():DataSources<IDataSources> => ({
    personalizationAPI: new PersonalizationAPI(),
}),
});
app.use('*', cors());
app.use(compression());
server.applyMiddleware({ app, path: '/graphql' });
const httpServer = createServer(app);
httpServer.listen(
  { port: 8080 },
  (): void => console.log(`\n🚀 GraphQL is now running on http://localhost:8080/graphql`));