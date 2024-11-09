import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import apiRouter from './controllers/api';

require('dotenv').config();

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

mongoose.connect(process.env.MONGODB_URI!).catch((err) => { console.log(err); });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
