import { Router } from 'express';
import { incantationsRouter, sorceriesRouter, spellsRouter } from './spells';

const apiRouter = Router();

apiRouter.use('/spells', spellsRouter);
apiRouter.use('/spells/sorceries', sorceriesRouter);
apiRouter.use('/spells/incantations', incantationsRouter);

export default apiRouter;
