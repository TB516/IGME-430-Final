import { IncomingMessage, ServerResponse } from 'http';
import { HydratedDocument, Model } from 'mongoose';
import { ISpell } from 'elden-ring-types';
import { badRequestResponse, postTypeUnsupportedResponse } from '../../errorResponses';
import { parseJson, parseUrlencoded } from '../../../../models/utils/parsers';

/**
 * Adds spell and responds with spell that was just added
 * @param request request object
 * @param response response object
 * @param SpellModel model to add spell to
 * @param doc document version of spell
 * @returns
 */
const addSpellResponse = async (request: IncomingMessage, response: ServerResponse, SpellModel: Model<ISpell>, doc: HydratedDocument<ISpell>) => {
  await SpellModel.create(doc);

  const jsonString = JSON.stringify(doc as ISpell);

  response.writeHead(201, 'Created Spell', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(jsonString, 'utf-8'),
  });
  response.write(jsonString);
  return response.end();
};

/**
 * Updates spell and responds confirming update was successful
 * @param request request object
 * @param response response object
 * @param SpellModel model to update in
 * @param doc document version of spell to update
 * @returns
 */
const updateSpellResponse = async (request: IncomingMessage, response: ServerResponse, SpellModel: Model<ISpell>, doc: HydratedDocument<ISpell>) => {
  await SpellModel.findByIdAndUpdate(doc._id, doc);

  response.writeHead(204, 'Updated Spell', {
    'content-length': 0,
    'content-type': 'null',
  });
  return response.end();
};

/**
 * Redirects to add spell or update spell depending on if spell exists in db
 * @param request request object
 * @param response response object
 * @param SpellModel model to post to
 * @param body spell to add
 * @returns
 */
const postSpellResponse = async (request: IncomingMessage, response: ServerResponse, SpellModel: Model<ISpell>, body: ISpell) => {
  const exists = await SpellModel.exists({ name: body.name });
  const doc = new SpellModel(body);
  const errors = doc.validateSync();

  if (errors) {
    return badRequestResponse(request, response, { id: 'badRequest', message: errors.message });
  }

  if (exists) {
    doc._id = exists._id;
    return updateSpellResponse(request, response, SpellModel, doc);
  }
  return addSpellResponse(request, response, SpellModel, doc);
};

/**
 * Gets request body and initiates post response
 * @param request request object
 * @param response response object
 * @param SpellModel model to post to
 */
const postSpellHandler = async (request: IncomingMessage, response: ServerResponse, SpellModel: Model<ISpell>) => {
  let body = '';

  request.on('data', (chunk) => {
    body += chunk.toString();
  });

  request.on('end', () => {
    if (request.headers['content-type'] === 'application/json') {
      return postSpellResponse(request, response, SpellModel, parseJson(body));
    }
    if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
      return postSpellResponse(request, response, SpellModel, parseUrlencoded(body));
    }

    return postTypeUnsupportedResponse(request, response);
  });
};

export default postSpellHandler;
