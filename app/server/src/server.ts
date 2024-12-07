import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

require('dotenv').config();

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_DOMAIN }));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
