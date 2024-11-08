import ISpell from '../../../../models/ISpell';
import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { resourceNotFoundResponse } from '../../errorResponses';

const getSpellResponse = async (request: Request, response: Response, SpellModel: Model<ISpell>) => {
  const exists = await SpellModel.exists({ name: RegExp(`(?:^|,)(${request.params.name})(?:,|$)`, 'i') });

  if (!exists) {
    resourceNotFoundResponse(request, response, {
      id: 'resourceNotFound',
      message: `'${request.params.name}' was not found.`,
    });
    return;
  }

  const spell = await SpellModel.findById(exists._id);

  response.status(200).json(spell);
};

export default getSpellResponse;
