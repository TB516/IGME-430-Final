import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import session from 'express-session';
import IORedis from 'ioredis';
import { RedisStore } from 'connect-redis';
import mongoose from 'mongoose';
import accounts from './accountRoutes';
import favorites from './favoriteRoutes';

require('dotenv').config();

const redisClient = new IORedis(process.env.REDIS_URL!);
mongoose.connect(process.env.MONGODB_URI!);

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3001;

app.use(helmet());
app.use(cors(
  {
    origin: [process.env.CLIENT_URL!],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true,
  },
));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  name: 'sessionCookie',
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production, false for localhost
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // SameSite None for production, Lax for localhost
    httpOnly: false,
  },
}));

app.use('/accounts', accounts);
app.use('/favorites', favorites);
app.use('/*', (req, res) => { res.status(400).json({ error: 'No endpoint exists!' }); });

app.listen(port, () => {
  console.log(process.env.NODE_ENV);

  console.log(`Listening on port ${port}`);
});
