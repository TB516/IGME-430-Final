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
  if (queryParams.fp) {
    spellQuery.fp = Number.parseInt(queryParams.fp.toString(), 10);
  }
  if (queryParams.slot) {
    spellQuery.slot = Number.parseInt(queryParams.slot.toString(), 10);
  }
  if (Number.isNaN(spellQuery.slot) || Number.isNaN(spellQuery.fp)) {
    badRequestResponse(request, response, { id: 'invalidParam', message: 'Slots and Cost must be numeric values.' });
    return;
  }

  const spells = await queryMethod(spellQuery);

  response.status(200).json(spells);
};

export default getSpellsResponse;
