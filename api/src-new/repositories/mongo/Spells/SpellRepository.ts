import mongoose from 'mongoose';
import MongoRepository from '../MongoRepository';
import { Spell } from '../../../models';
import Query from '../../../models/Query';

export default class SpellRepository extends MongoRepository<Spell> {
  public async search(query: Query): Promise<Spell[]> {
    const mongoObjects = await this._model.find(query).lean<Spell[]>().exec();
    return mongoObjects.map((s) => this.toData(s));
  }

  public async findById(id: string): Promise<Spell | null> {
    const mongoObject = await this._model.findById(id).lean<Spell>().exec();

    return mongoObject ? this.toData(mongoObject) : null;
  }

  public async exists(spell: Spell): Promise<string | null> {
    const exists = await this._model.exists({ name: spell.name }).exec();

    return exists ? exists._id.toString() : null;
  }

  public async create(spell: Spell): Promise<Spell | null> {
    try {
      return this.toData(await this._model.create(spell));
    } catch {
      return null;
    }
  }

  public async updateById(id: string, spell: Spell): Promise<Spell | null> {
    const result = await this._model.findByIdAndUpdate(new mongoose.Types.ObjectId(id), spell).lean<Spell | null>().exec();

    return result ? this.toData(result) : null;
  }

  public async deleteById(id: string): Promise<Spell | null> {
    const deletedSpell = await this._model.findByIdAndDelete(new mongoose.Types.ObjectId(id)).lean<Spell | null>().exec();

    return deletedSpell ? this.toData(deletedSpell) : null;
  }

  /**
   * Converts a leaned mongoose doc of a spell to an actual spell object
   * @param mongooseSpell Leaned mongoose doc to convert to actual spell
   * @returns Spell object with data of leaned mongoose doc
   */
  protected toData(mongooseSpell: Spell): Spell {
    return new Spell(
      // eslint-disable-next-line dot-notation
      mongooseSpell['_id']!.toString(),
      mongooseSpell.name,
      mongooseSpell.image,
      mongooseSpell.description,
      mongooseSpell.effect,
      mongooseSpell.fp,
      mongooseSpell.slot,
      mongooseSpell.int,
      mongooseSpell.faith,
      mongooseSpell.arc,
      mongooseSpell.bonus,
      mongooseSpell.location,
      mongooseSpell.stamina,
    );
  }
}
