import { IncomingMessage, ServerResponse } from 'http';
import incantationResponse from './incantationResponses';
import sorceryResponse from './sorceryResponses';
import { methodNotAllowedResponse, endpointNotFoundResponse } from './errorResponses';
import ISpellQuery from '../../models/ISpellQuery';
import { getSpellMatches } from '../dbQueries';
import IErrorMessage from '../../models/IErrorMessage';

const getSpellResponse = async (request: IncomingMessage, response: ServerResponse) => {
  const queryParams = new URL(request.url!, `https://${request.headers.host}`).searchParams;
  const spellQuery = {} as ISpellQuery;

  if (queryParams.get('name')) {
    spellQuery.name = new RegExp(queryParams.get('name')!, 'i');
  }
  if (queryParams.get('type')) {
    spellQuery.type = new RegExp(queryParams.get('type')!, 'i');
  }
  if (queryParams.get('cost')) {
    spellQuery.cost = Number.parseInt(queryParams.get('cost')!, 10);
  }
  if (queryParams.get('slots')) {
    spellQuery.slots = Number.parseInt(queryParams.get('slots')!, 10);
  }

  const spells = await getSpellMatches(spellQuery);
  const jsonString = JSON.stringify(spells);

  response.writeHead(200, 'Success', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(jsonString, 'utf-8'),
  });

  if (request.method !== 'HEAD') {
    response.write(jsonString);
  }
  return response.end();
};

const spellResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getSpellResponse(request, response);
  }
  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as IErrorMessage,
    ['HEAD', 'GET', 'POST'],
  );
};

export {
  spellResponse,
  incantationResponse,
  sorceryResponse,
  endpointNotFoundResponse,
};
