import { IncomingMessage, ServerResponse } from 'http';
import { Sorceries, Incantations } from '../Models/Spell';
import { ErrorMessage } from '../Models/ErrorMessage';
import ISpell from '../Models/ISpell';

const methodNotAllowed = (
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

// eslint-disable-next-line arrow-body-style
const getAllSpells = async (): Promise<ISpell[]> => {
  return [...await Sorceries.find(), ...await Incantations.find()];
};

const getAllSpellsRequest = async (request: IncomingMessage, response: ServerResponse) => {
  if (request.method !== 'HEAD' && request.method !== 'GET') {
    return methodNotAllowed(request, response, { id: 'methodNotAllowed', message: `${request.method} requests not supported at this endpoint.` } as ErrorMessage);
  }

  const spells = await getAllSpells();
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

// eslint-disable-next-line import/prefer-default-export
export { getAllSpellsRequest };
