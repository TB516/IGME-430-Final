import { Request, Response } from 'express';
import { dbQuery } from '../dbQueries';
import ISpellQuery from '../../../../models/ISpellQuery';
import { badRequestResponse } from '../../errorResponses';

/**
 * Searches database based on query parameters and responds with all matching spells
 * @param request request object
 * @param response response object
 * @param queryMethod callback method to query the specific model
 * @returns
 */
const getSpellsResponse = async (request: Request, response: Response, queryMethod: dbQuery) => {
  const queryParams = request.query;
  const spellQuery = {} as ISpellQuery;

  if (queryParams.name) {
    spellQuery.name = new RegExp(queryParams.name.toString(), 'i');
  }
  if (queryParams.cost) {
    spellQuery.cost = Number.parseInt(queryParams.cost.toString(), 10);
  }
  if (queryParams.slots) {
    spellQuery.slots = Number.parseInt(queryParams.slots.toString(), 10);
  }
  if (Number.isNaN(spellQuery.slots) || Number.isNaN(spellQuery.cost)) {
    badRequestResponse(request, response, { id: 'invalidParam', message: 'Slots and Cost must be numeric values.' });
    return;
  }

  const spells = await queryMethod(spellQuery);

  response.status(200).json(spells);
};

export default getSpellsResponse;
