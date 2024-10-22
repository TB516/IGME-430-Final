import { Router, Request, Response } from 'express';
import { getSpellsResponse } from './spellResponses';
import { getSpellMatches } from './dbQueries';
import { methodNotAllowedResponse } from '../errorResponses';

const spellsRouter = Router();

const getSpells = (request: Request, response: Response) => {
  getSpellsResponse(request, response, getSpellMatches);
};
const notAllowedSpells = (request: Request, response: Response) => {
  methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET'],
  );
};

spellsRouter.get('/', getSpells);
spellsRouter.all('/', notAllowedSpells);

export default spellsRouter;
