import { IncomingMessage, ServerResponse } from 'http';
import { methodNotAllowedResponse } from '../errorResponses';
import { deleteSpellHandler, getSpellsResponse, postSpellHandler } from './spellResponses';
import { getIncantationMatches } from './dbQueries';
import { Incantations } from '../../../models/Spell';

const incantationsResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getSpellsResponse(request, response, getIncantationMatches);
  }
  if (request.method === 'POST') {
    return postSpellHandler(request, response, Incantations);
  }
  if (request.method === 'DELETE') {
    return deleteSpellHandler(request, response, Incantations);
  }

  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET', 'POST', 'DELETE'],
  );
};

export default incantationsResponse;
