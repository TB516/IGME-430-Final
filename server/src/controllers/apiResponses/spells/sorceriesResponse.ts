import { IncomingMessage, ServerResponse } from 'http';
import { methodNotAllowedResponse } from '../errorResponses';
import getSpellsResponse from './spellResponses/getSpells';
import { getSpellMatches } from './dbQueries';
import postSpellHandler from './spellResponses/postSpell';
import { Sorceries } from '../../../models/Spell';
import { deleteSpellHandler } from './spellResponses';

/**
 * Handles method and redirects to correct response
 * @param request request object
 * @param response response object
 * @returns
 */
const sorceriesResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getSpellsResponse(request, response, getSpellMatches);
  }
  if (request.method === 'POST') {
    return postSpellHandler(request, response, Sorceries);
  }
  if (request.method === 'DELETE') {
    return deleteSpellHandler(request, response, Sorceries);
  }

  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET', 'POST', 'DELETE'],
  );
};

export default sorceriesResponse;
