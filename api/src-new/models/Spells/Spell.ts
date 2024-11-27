import Data from '../Data';
import { ValidationOutput } from '../ValidationOutput';

class Spell extends Data {
  protected _image?: string;

  protected _description: string;

  protected _effect: string;

  protected _fp: string;

  protected _slot: number;

  protected _int: number;

  protected _faith: number;

  protected _arc: number;

  protected _bonus?: string;

  protected _location?: string;

  protected _stamina: number;

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
    this._image = image;
    this._description = description;
    this._effect = effect;
    this._fp = fp;
    this._slot = slot;
    this._int = int;
    this._faith = faith;
    this._arc = arc;
    this._bonus = bonus;
    this._location = location;
    this._stamina = stamina;
  }

  public get image(): string | undefined {
    return this._image;
  }

  public get description(): string {
    return this._description;
  }

  public get effect(): string {
    return this._effect;
  }

  public get fp(): string {
    return this._fp;
  }

  public get slot(): number {
    return this._slot;
  }

  public get int(): number {
    return this._int;
  }

  public get faith(): number {
    return this._faith;
  }

  public get arc(): number {
    return this.arc;
  }

  public get bonus(): string | undefined {
    return this._bonus;
  }

  public get location(): string | undefined {
    return this._location;
  }

  public get stamina(): number {
    return this._stamina;
  }

  public validate(): ValidationOutput {
    const errors = {} as Record<string, string>;

    return Object.keys(errors).length !== 0 ? errors : true;
  }
}

export default Spell;
