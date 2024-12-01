import { Request, Response } from 'express';
import BaseController from './BaseController';
import { Spell, SpellQuery } from '../models';
import * as clientErrors from '../utils/error/client';

class SpellController extends BaseController<Spell> {
  public async getSingle(request: Request, response: Response): Promise<void> {
    const id = await this.m_repository.exists({ name: request.params.name } as Spell);

    if (!id) {
      clientErrors.resourceNotFoundResponse(request, response, {
        id: 'resourceNotFound',
        message: `'${request.params.name}' was not found.`,
      });
      return;
    }

    const spell = await this.m_repository.findById(id);

    response.status(200).json(spell);
  }

  public async getMany(request: Request, response: Response): Promise<void> {
    const spellQuery = this.createQuery(request);

    if (Number.isNaN(spellQuery.slot)) {
      clientErrors.badRequestResponse(request, response, { id: 'invalidParam', message: 'Slots and Cost must be numeric values.' });
      return;
    }

    response.status(200).json(await this.m_repository.search(spellQuery));
  }

  public async post(request: Request, response: Response): Promise<void> {
    if (request.headers['content-type'] !== 'application/json' && request.headers['content-type'] !== 'application/x-www-form-urlencoded') {
      clientErrors.postTypeUnsupportedResponse(request, response);
    }

    const spell = this.createSpell(request);
    const validationResults = spell.validate();

    if (Object.keys(validationResults).length > 0) {
      clientErrors.badRequestResponse(request, response, { id: 'badRequest', message: JSON.stringify(validationResults) });
      return;
    }

    const id = await this.m_repository.exists(spell);

    if (!id) {
      this.add(request, response, spell);
      return;
    }

    spell._id = id;
    this.update(request, response, spell);
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const id = await this.m_repository.exists({ name: request.params.name } as Spell);

    if (!id) {
      clientErrors.resourceNotFoundResponse(request, response, {
        id: 'resourceNotFound',
        message: `'${request.params.name}' was not found.`,
      });
      return;
    }

    await this.m_repository.deleteById(id);

    response.status(204).send();
  }

  protected async add(request: Request, response: Response, data: Spell): Promise<void> {
    const spell = await this.m_repository.create(data);
    response.status(201).json(spell);
  }

  protected async update(request: Request, response: Response, data: Spell): Promise<void> {
    await this.m_repository.updateById(data._id!, data);

    response.status(204).send();
  }

  protected createSpell(request: Request): Spell {
    const data = request.body;

    return new Spell(
      undefined,
      data.name,
      data.image,
      data.description,
      data.effect,
      data.fp,
      data.slot,
      data.int,
      data.faith,
      data.arc,
      data.bonus,
      data.location,
      data.stamina,
    );
  }

  protected createQuery(request: Request) : SpellQuery {
    const queryParams = request.query;
    let spellName: string | undefined;
    let spellFp: string | undefined;
    let spellSlot: number | undefined;

    if (queryParams.name) {
      spellName = queryParams.name.toString();
    }
    if (queryParams.fp) {
      spellFp = queryParams.fp.toString();
    }
    if (queryParams.slot) {
      spellSlot = Number.parseInt(queryParams.slot.toString(), 10);
    }

    return new SpellQuery(spellName, spellFp, spellSlot);
  }
}

export default SpellController;
