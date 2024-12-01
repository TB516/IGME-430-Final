import MongoRepository from '../MongoRepository';
import { Spell } from '../../../models';
import { ISpell, SpellQuery } from '../../../models/Spells';
import ISpellQuery from '../../../models/Spells/ISpellQuery';

export default class SpellRepository extends MongoRepository<Spell, ISpell> {
  public async search(query: SpellQuery): Promise<Spell[]> {
    const mongoQuery = this.toIQuery(query);

    const mongoObjects = await this._model.find(mongoQuery).lean<ISpell[]>().exec();

    return mongoObjects.map((s) => this.toObjectT(s));
  }

  protected toIQuery(query: SpellQuery): ISpellQuery {
    const formattedQuery = {} as ISpellQuery;

    if (query.name) {
      formattedQuery.name = query.name;
    }
    if (query.fp) {
      formattedQuery.fp = query.fp;
    }
    if (query.slot) {
      formattedQuery.slot = query.slot;
    }

    return formattedQuery;
  }

  protected toObjectU(data: Spell): ISpell {
    return {
      _id: data._id,
      name: data.name,
      image: data.image,
      description: data.description,
      effect: data.effect,
      fp: data.fp,
      slot: data.slot,
      int: data.int,
      faith: data.faith,
      arc: data.arc,
      bonus: data.bonus,
      location: data.location,
      stamina: data.stamina,
    } as ISpell;
  }

  protected toObjectT(data: ISpell): Spell {
    return new Spell(
      data._id?.toString(),
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
}
