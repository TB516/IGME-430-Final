import ISpell from './ISpell';
import { ValidationOutput } from '../ValidationOutput';

class Spell implements ISpell {
  _id?: string;

  name: string;

  image?: string;

  description: string;

  effect: string;

  fp: string;

  slot: number;

  int: number;

  faith: number;

  arc: number;

  bonus?: string;

  location?: string;

  stamina: number;

  constructor(spell: ISpell) {
    this._id = spell._id;
    this.name = spell.name;
    this.image = spell.image;
    this.description = spell.description;
    this.effect = spell.effect;
    this.fp = spell.fp;
    this.slot = spell.slot;
    this.int = spell.int;
    this.faith = spell.faith;
    this.arc = spell.arc;
    this.bonus = spell.bonus;
    this.location = spell.location;
    this.stamina = spell.stamina;
  }

  public validate(): ValidationOutput {
    const errors = {} as Record<string, string>;

    if (!this.name) {
      errors.name = 'A name is required!';
    }
    if (!this.description) {
      errors.description = 'A description is required!';
    }
    if (!this.effect) {
      errors.effect = 'An effect is required!';
    }
    if (!this.fp) {
      errors.fp = 'A fp amount is required!';
    }
    if (!this.slot) {
      errors.slot = 'A number of slots taken is required!';
    }
    if (!Number.isNaN(this.int) && this.int < 0) {
      errors.int = 'The intelligence requirement must be a positive number!';
    }
    if (!Number.isNaN(this.faith) && this.faith < 0) {
      errors.faith = 'The faith requirement must be a positive number!';
    }
    if (!Number.isNaN(this.arc) && this.arc < 0) {
      errors.arc = 'The arcane requirement must be a positive number!';
    }
    if (!Number.isNaN(this.stamina) && this.stamina < 0) {
      errors.stamina = 'The stamina usage must be a positive number!';
    }

    return Object.keys(errors).length !== 0 ? errors : true;
  }

  public toJSON(): ISpell {
    return {
      _id: this._id,
      name: this.name,
      image: this.image,
      description: this.description,
      effect: this.effect,
      fp: this.fp,
      slot: this.slot,
      int: this.int,
      faith: this.faith,
      arc: this.arc,
      bonus: this.bonus,
      location: this.location,
      stamina: this.stamina,
    };
  }
}

export default Spell;
