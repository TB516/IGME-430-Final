import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import favicon from 'serve-favicon';
import path from 'path';
import apiRouter from './controllers/api';

require('dotenv').config();

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use('/assets', express.static(path.resolve(`${__dirname}/../api-viewer/assets`)));
  app.use(favicon(path.resolve(`${__dirname}/../api-viewer/favicon.png`)));
} else {
  app.use('/assets', express.static(path.resolve(`${__dirname}/../../dist/api-viewer/assets`)));
  app.use(favicon(path.resolve(`${__dirname}/../../dist/api-viewer/favicon.png`)));
}

app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (_request: Request, response: Response) => {
    response.sendFile(path.resolve(`${__dirname}/../api-viewer/index.html`));
  });
} else {
  app.get('*', (_request: Request, response: Response) => {
    response.sendFile(path.resolve(`${__dirname}/../../dist/api-viewer/index.html`));
  });
}

mongoose.connect(process.env.MONGODB_URI!).catch((err) => { console.log(err); });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
