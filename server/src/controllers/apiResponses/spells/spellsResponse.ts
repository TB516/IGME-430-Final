import { IncomingMessage, ServerResponse } from 'http';
import { methodNotAllowedResponse } from '../errorResponses';
import { getSpellsResponse } from './spellResponses';
import { getSpellMatches } from './dbQueries';

/**
 * Handles method and redirects to correct response
 * @param request request object
 * @param response response object
 * @returns
 */
const spellsResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getSpellsResponse(request, response, getSpellMatches);
  }
  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET'],
  );
};

export default spellsResponse;
