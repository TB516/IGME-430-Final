import { IncomingMessage, ServerResponse } from 'http';
import { Model } from 'mongoose';
import { ISpell } from 'elden-ring-types';
import { postTypeUnsupportedResponse, resourceNotFoundResponse } from '../../errorResponses';
import { parseJson, parseUrlencoded } from '../../../../models/utils/parsers';

const deleteSpellResponse = async (request: IncomingMessage, response: ServerResponse, SpellModel: Model<ISpell>, body: ISpell) => {
  const exists = await SpellModel.exists({ name: body.name });

  if (exists) {
    await SpellModel.findByIdAndDelete(exists._id);

    response.writeHead(204, 'Deleted Spell');
    return response.end();
  }

  return resourceNotFoundResponse(request, response, {
    id: 'resourceNotFound',
    message: `'${body.name}' was not found.`,
  });
};

const deleteSpellHandler = async (request: IncomingMessage, response: ServerResponse, SpellModel: Model<ISpell>) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    if (request.headers['content-type'] === 'application/json') {
      return deleteSpellResponse(request, response, SpellModel, parseJson(body));
    }
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      return deleteSpellResponse(request, response, SpellModel, parseUrlencoded(body));
    }

    return postTypeUnsupportedResponse(request, response);
  });
};

export default deleteSpellHandler;
