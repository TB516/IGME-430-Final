import { IncomingMessage, ServerResponse } from 'http';
import { ObjectId } from 'mongoose';
import ISpellQuery from '../../models/ISpellQuery';
import { getSorceryMatches } from '../dbQueries';
import { badRequestResponse, methodNotAllowedResponse, postTypeUnsupportedResponse } from './errorResponses';
import IErrorMessage from '../../models/IErrorMessage';
import ISpell from '../../models/ISpell';
import { parseJson, parseUrlencoded } from '../../models/utils/parsers';
import { Sorceries } from '../../models/Spell';

const getSorceryResponse = async (request: IncomingMessage, response: ServerResponse) => {
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

  const sorceries = await getSorceryMatches(spellQuery);
  const jsonString = JSON.stringify(sorceries);

  response.writeHead(200, 'Success', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(jsonString, 'utf-8'),
  });

  if (request.method !== 'HEAD') {
    response.write(jsonString);
  }
  return response.end();
};

const addSorceryResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell) => {
  const doc = new Sorceries(body, { versionKey: false });
  const errors = doc.validateSync();

  if (errors) {
    return badRequestResponse(request, response, { id: 'badRequest', message: errors.message });
  }

  await Sorceries.create(doc);

  const jsonString = JSON.stringify(doc as ISpell);

  response.writeHead(201, 'Created Sorcery', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(jsonString, 'utf-8'),
  });
  response.write(jsonString);
  return response.end();
};

const updateSorceryResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell, id: ObjectId) => {
  const doc = new Sorceries(body, { versionKey: false });
  doc._id = id;

  const errors = doc.validateSync();

  if (errors) {
    return badRequestResponse(request, response, { id: 'badRequest', message: errors.message });
  }

  await Sorceries.findByIdAndUpdate(id, doc);

  response.writeHead(204, 'Updated Sorcery');
  return response.end();
};

const postSorceryResponse = async (request: IncomingMessage, response: ServerResponse, body: ISpell) => {
  const exists = await Sorceries.exists(body);

  if (exists) {
    return updateSorceryResponse(request, response, body, exists._id);
  }
  return addSorceryResponse(request, response, body);
};

const postSorceryHandler = async (request: IncomingMessage, response: ServerResponse) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    if (request.headers['content-type'] === 'application/json') {
      return postSorceryResponse(request, response, parseJson(body));
    }
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      return postSorceryResponse(request, response, parseUrlencoded(body));
    }

    return postTypeUnsupportedResponse(request, response);
  });
};

const sorceryResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method === 'HEAD' || request.method === 'GET') {
    return getSorceryResponse(request, response);
  }
  if (request.method === 'POST') {
    return postSorceryHandler(request, response);
  }
  return methodNotAllowedResponse(
    request,
    response,
    { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as IErrorMessage,
    ['HEAD', 'GET', 'POST'],
  );
};

export default sorceryResponse;
