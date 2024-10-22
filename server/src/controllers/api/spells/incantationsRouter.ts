import { Router, Request, Response } from 'express';
import { deleteSpellResponse, getSpellsResponse, postSpellResponse } from './spellResponses';
import { getIncantationMatches } from './dbQueries';
import { methodNotAllowedResponse } from '../errorResponses';
import { Incantations } from '../../../models/Spell';

const incantationsRouter = Router();

const getIncantations = (request: Request, response: Response) => {
  getSpellsResponse(request, response, getIncantationMatches);
};
const postIncantations = (request: Request, response: Response) => {
  postSpellResponse(request, response, Incantations);
};
const deleteIncantations = (request: Request, response: Response) => {
  deleteSpellResponse(request, response, Incantations);
};
const notAllowedIncantations = (request: Request, response: Response) => {
  methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET', 'POST', 'DELETE'],
  );
};

incantationsRouter.get('/', getIncantations);
incantationsRouter.post('/', postIncantations);
incantationsRouter.delete('/', deleteIncantations);
incantationsRouter.all('/', notAllowedIncantations);

export default incantationsRouter;
