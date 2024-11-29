import { Router } from 'express';
import spellsRouter from './spells';

const apiRouter = Router();

apiRouter.use('/spells', spellsRouter);

export default apiRouter;
