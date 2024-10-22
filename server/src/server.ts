import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import path from 'path';
import apiRouter from './controllers/apiResponses';

require('dotenv').config();

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const app = express();

app.use(compression());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(`${__dirname}/../client/`)));
} else {
  app.use('/', express.static(path.resolve(`${__dirname}/../../dist/client/`)));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);

mongoose.connect(process.env.MONGODB_URI!).catch((err) => { console.log(err); });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
