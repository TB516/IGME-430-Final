import { IncomingMessage, ServerResponse } from 'http';
import ErrorMessage from '../models/ErrorMessage';
import ISpellQuery from '../models/ISpellQuery';
import { getIncantationMatches, getSorceryMatches, getSpellMatches } from './dbQueries';

const methodNotAllowedResponse = (
  _request: IncomingMessage,
  response: ServerResponse,
  message: ErrorMessage,
) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(405, 'Method Not Allowed', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

const resourceNotFoundResponse = (
  _request: IncomingMessage,
  response: ServerResponse,
  message: ErrorMessage,
) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(404, 'Resource Not Found', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

const endpointNotFoundResponse = (request: IncomingMessage, response: ServerResponse) => {
  return resourceNotFoundResponse(request, response, {
    id: 'endpointNotFound',
    message: `The requested endpoint of ${request.url} was not found.`,
  } as ErrorMessage);
};

const getSpellResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method !== 'HEAD' && request.method !== 'GET') {
    return methodNotAllowedResponse(request, response, { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as ErrorMessage);
  }

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

const getSorceryResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method !== 'HEAD' && request.method !== 'GET') {
    return methodNotAllowedResponse(request, response, { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as ErrorMessage);
  }

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

const getIncantationResponse = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method !== 'HEAD' && request.method !== 'GET') {
    return methodNotAllowedResponse(request, response, { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as ErrorMessage);
  }

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

export {
  getSpellResponse,
  getSorceryResponse,
  getIncantationResponse,
  endpointNotFoundResponse,
};
