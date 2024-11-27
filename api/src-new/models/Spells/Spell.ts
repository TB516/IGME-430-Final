import Data from '../Data';
import { ValidationOutput } from '../ValidationOutput';

class Spell extends Data {
  protected image?: string;

  protected description: string;

  protected effect: string;

  protected fp: string;

  protected slot: number;

  protected int: number;

  protected faith: number;

  protected arc: number;

  protected bonus?: string;

  protected location?: string;

  protected stamina: number;

  constructor(
    id: string | undefined,
    name: string,
    image: string | undefined,
    description: string,
    effect: string,
    fp: string,
    slot: number,
    int: number,
    faith: number,
    arc: number,
    bonus: string | undefined,
    location: string | undefined,
    stamina: number,
  ) {
    super(id, name);
    this.image = image;
    this.description = description;
    this.effect = effect;
    this.fp = fp;
    this.slot = slot;
    this.int = int;
    this.faith = faith;
    this.arc = arc;
    this.bonus = bonus;
    this.location = location;
    this.stamina = stamina;
  }

  public validate(): ValidationOutput {
    const errors = {} as Record<string, string>;

    return Object.keys(errors).length !== 0 ? errors : true;
  }
}

export default Spell;
