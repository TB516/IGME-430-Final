import { Router, Request, Response } from 'express';
import {
  deleteSpellResponse,
  getSpellResponse,
  getSpellsResponse,
  postSpellResponse,
} from './spellResponses';
import { getIncantationMatches } from './dbQueries';
import { endpointNotFoundResponse, methodNotAllowedResponse } from '../../errorResponses';
import { Incantations } from '../../../models/Spells/Spell';

const incantationsRouter = Router();

const getIncantations = (request: Request, response: Response) => {
  getSpellsResponse(request, response, getIncantationMatches);
};
const getIncantation = (request: Request, response: Response) => {
  getSpellResponse(request, response, Incantations);
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
incantationsRouter.get('/:name', getIncantation);
incantationsRouter.post('/', postIncantations);
incantationsRouter.delete('/:name', deleteIncantations);
incantationsRouter.all('/:route', endpointNotFoundResponse);
incantationsRouter.all('*', notAllowedIncantations);

export default incantationsRouter;
