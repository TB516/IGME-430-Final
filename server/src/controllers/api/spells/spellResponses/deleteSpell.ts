import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { ISpell } from 'elden-ring-types';
import { resourceNotFoundResponse } from '../../errorResponses';

/**
 * Searches in database for a spell and deletes it
 * @param request request object
 * @param response response object
 * @param SpellModel spell model to look for body object in
 * @param body object to delete
 * @returns
 */
const deleteSpellResponse = async (request: Request, response: Response, SpellModel: Model<ISpell>) => {
  const exists = await SpellModel.exists({ name: request.query.name });

  if (exists) {
    await SpellModel.findByIdAndDelete(exists._id);

    response.status(204).send();
    return;
  }

  resourceNotFoundResponse(request, response, {
    id: 'resourceNotFound',
    message: `'${request.query.name}' was not found.`,
  });
};

export default deleteSpellResponse;
