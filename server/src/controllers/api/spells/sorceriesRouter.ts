import { Router, Request, Response } from 'express';
import { deleteSpellResponse, getSpellsResponse, postSpellResponse } from './spellResponses';
import { getSorceryMatches } from './dbQueries';
import { methodNotAllowedResponse } from '../errorResponses';
import { Sorceries } from '../../../models/Spell';

const sorceriesRouter = Router();

const getSorceries = (request: Request, response: Response) => {
  getSpellsResponse(request, response, getSorceryMatches);
};
const postSorceries = (request: Request, response: Response) => {
  postSpellResponse(request, response, Sorceries);
};
const deleteSorceries = (request: Request, response: Response) => {
  deleteSpellResponse(request, response, Sorceries);
};
const notAllowedSorceries = (request: Request, response: Response) => {
  methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET', 'POST', 'DELETE'],
  );
};

sorceriesRouter.get('/', getSorceries);
sorceriesRouter.post('/', postSorceries);
sorceriesRouter.delete('/', deleteSorceries);
sorceriesRouter.all('/', notAllowedSorceries);

export default sorceriesRouter;
