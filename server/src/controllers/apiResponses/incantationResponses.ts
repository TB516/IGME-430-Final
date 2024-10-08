import { IncomingMessage, ServerResponse } from 'http';
import { ObjectId } from 'mongoose';
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

const addIncantationResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell) => {
  const doc = new Incantations(body);
  const errors = doc.validateSync();

  if (errors) {
    return badRequestResponse(request, response, { id: 'badRequest', message: errors.message });
  }

  await Incantations.create(doc);

  const jsonString = JSON.stringify(doc as ISpell);

  response.writeHead(201, 'Created Incantation', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(jsonString, 'utf-8'),
  });
  response.write(jsonString);
  return response.end();
};

const updateIncantationResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell, id: ObjectId) => {
  const doc = new Incantations(body);
  doc._id = id;

  const errors = doc.validateSync();

  if (errors) {
    return badRequestResponse(request, response, { id: 'badRequest', message: errors.message });
  }

  await Incantations.findByIdAndUpdate(id, doc);

  response.writeHead(204, 'Updated Incantation');
  return response.end();
};

const postIncantationResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell) => {
  const exists = await Incantations.exists({ id: body.id });

  if (exists) {
    return updateIncantationResponse(request, response, body, exists._id);
  }
  return addIncantationResponse(request, response, body);
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
