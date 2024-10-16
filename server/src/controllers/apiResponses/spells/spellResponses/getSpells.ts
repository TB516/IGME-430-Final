import { IncomingMessage, ServerResponse } from 'http';
import { dbQuery } from '../dbQueries';
import ISpellQuery from '../../../../models/ISpellQuery';
import { badRequestResponse } from '../../errorResponses';

const getSpellsResponse = async (request: IncomingMessage, response: ServerResponse, queryMethod: dbQuery) => {
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
  if (Number.isNaN(spellQuery.slots) || Number.isNaN(spellQuery.cost)) {
    return badRequestResponse(request, response, { id: 'invalidParam', message: 'Slots and Cost must be numeric values.' });
  }

  const spells = await queryMethod(spellQuery);
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

export default getSpellsResponse;
