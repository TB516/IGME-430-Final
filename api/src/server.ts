import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import initServer from './config';
import configureApp from './app';

require('dotenv').config();

initServer().then(() => {
  const app = express();
  const port = process.env.PORT || process.env.NODE_PORT || 3000;

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  configureApp(app);

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
