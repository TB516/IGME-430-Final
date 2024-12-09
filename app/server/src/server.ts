import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import IORedis from 'ioredis';
import { RedisStore } from 'connect-redis';
import mongoose from 'mongoose';

require('dotenv').config();

const redisClient = new IORedis(process.env.REDIS_URL!);
mongoose.connect(process.env.MONGODB_URI!);

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_DOMAIN }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
}));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
