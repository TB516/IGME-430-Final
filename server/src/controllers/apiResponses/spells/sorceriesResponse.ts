import { IncomingMessage, ServerResponse } from 'http';
import { methodNotAllowedResponse } from '../errorResponses';
import getSpellsResponse from './spellResponses/getSpells';
import { getSpellMatches } from './dbQueries';
import postSpellHandler from './spellResponses/postSpell';
import { Sorceries } from '../../../models/Spell';

const sorceriesResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getSpellsResponse(request, response, getSpellMatches);
  }
  if (request.method === 'POST') {
    return postSpellHandler(request, response, Sorceries);
  }
  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` },
    ['HEAD', 'GET', 'POST'],
  );
};

export default sorceriesResponse;
