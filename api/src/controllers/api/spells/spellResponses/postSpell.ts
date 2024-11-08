import { Request, Response } from 'express';
import { HydratedDocument, Model } from 'mongoose';
import ISpell from '../../../../models/ISpell';
import { badRequestResponse, postTypeUnsupportedResponse } from '../../errorResponses';

/**
 * Adds spell and responds with spell that was just added
 * @param request request object
 * @param response response object
 * @param SpellModel model to add spell to
 * @param doc document version of spell
 * @returns
 */
const addSpellResponse = async (request: Request, response: Response, SpellModel: Model<ISpell>, doc: HydratedDocument<ISpell>) => {
  await SpellModel.create(doc);

  response.status(201).json(doc as ISpell);
};

/**
 * Updates spell and responds confirming update was successful
 * @param request request object
 * @param response response object
 * @param SpellModel model to update in
 * @param doc document version of spell to update
 * @returns
 */
const updateSpellResponse = async (request: Request, response: Response, SpellModel: Model<ISpell>, doc: HydratedDocument<ISpell>) => {
  await SpellModel.findByIdAndUpdate(doc._id, doc);

  response.status(204).send();
};

/**
 * Redirects to add spell or update spell depending on if spell exists in db
 * @param request request object
 * @param response response object
 * @param SpellModel model to post to
 * @returns
 */
const postSpellResponse = async (request: Request, response: Response, SpellModel: Model<ISpell>) => {
  if (request.headers['content-type'] !== 'application/json' && request.headers['content-type'] !== 'application/x-www-form-urlencoded') {
    postTypeUnsupportedResponse(request, response);
    return;
  }

  const spell = request.body as ISpell;
  const exists = await SpellModel.exists({ name: spell.name });
  const doc = new SpellModel(spell);
  const errors = doc.validateSync();

  if (errors) {
    badRequestResponse(request, response, { id: 'badRequest', message: errors.message });
    return;
  }

  if (exists) {
    doc._id = exists._id;
    updateSpellResponse(request, response, SpellModel, doc);
    return;
  }
  addSpellResponse(request, response, SpellModel, doc);
};

export default postSpellResponse;
