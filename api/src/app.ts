import express from 'express';
import sorceryRoutes from './routes/sorceryRoutes';
import incantationRoutes from './routes/incantationRoutes';

const configureApp = (app: express.Express) => {
  app.use('/sorceries', sorceryRoutes);
  app.use('/incantations', incantationRoutes);
};

export default configureApp;
