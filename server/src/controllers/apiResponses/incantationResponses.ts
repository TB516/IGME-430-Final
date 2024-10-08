import { IncomingMessage, ServerResponse } from 'http';
import ISpellQuery from '../../models/ISpellQuery';
import { getIncantationMatches } from '../dbQueries';
import { badRequestResponse, methodNotAllowedResponse, postTypeUnsupportedResponse } from './errorResponses';
import IErrorMessage from '../../models/IErrorMessage';
import ISpell from '../../models/ISpell';
import { parseJson, parseUrlencoded } from '../../models/utils/parsers';
import { Incantations } from '../../models/Spell';

const getIncantationResponse = async (request: IncomingMessage, response: ServerResponse) => {
  const queryParams = new URL(request.url!, `https://${request.headers.host}`).searchParams;
  const spellQuery = {} as ISpellQuery;

  if (queryParams.get('name')) {
    spellQuery.name = new RegExp(queryParams.get('name')!, 'i');
  }
  if (queryParams.get('cost')) {
    spellQuery.cost = Number.parseInt(queryParams.get('cost')!, 10);
  }
  if (queryParams.get('slots')) {
    spellQuery.slots = Number.parseInt(queryParams.get('slots')!, 10);
  }

  const incantations = await getIncantationMatches(spellQuery);
  const jsonString = JSON.stringify(incantations);

  response.writeHead(200, 'Success', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(jsonString, 'utf-8'),
  });

  if (request.method !== 'HEAD') {
    response.write(jsonString);
  }
  return response.end();
};

const postIncantationResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell) => {
  const doc = new Incantations(body);
  const errors = doc.validateSync();

  if (errors) {
    return badRequestResponse(request, response, { id: 'badRequest', message: 'Invalid incantation data.' });
  }

  const { isNew } = await doc.save();

  const jsonString = JSON.stringify(doc as ISpell);

  if (isNew) {
    response.writeHead(201, 'Created', {
      'content-type': 'application/json',
      'content-length': Buffer.byteLength(jsonString, 'utf-8'),
    });
    response.write(jsonString);
  } else {
    response.writeHead(204, 'Updated');
  }
  return response.end();
};

const postIncantationHandler = async (request: IncomingMessage, response: ServerResponse) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    if (request.headers['content-type'] === 'application/json') {
      return postIncantationResponse(request, response, parseJson(body));
    }
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      return postIncantationResponse(request, response, parseUrlencoded(body));
    }

    return postTypeUnsupportedResponse(request, response);
  });
};

const incantationResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getIncantationResponse(request, response);
  }
  if (request.method === 'POST') {
    return postIncantationHandler(request, response);
  }
  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as IErrorMessage,
    ['HEAD', 'GET', 'POST'],
  );
};

export default incantationResponse;
