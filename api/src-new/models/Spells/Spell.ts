import { ValidationOutput } from '../ValidationOutput';
import ISpell from './ISpell';
import Data from '../Data';

class Spell extends Data implements ISpell {
  protected m_image?: string;

  protected m_description: string;

  protected m_effect: string;

  protected m_fp: string;

  protected m_slot: number;

  protected m_int: number;

  protected m_faith: number;

  protected m_arc: number;

  protected m_bonus?: string;

  protected m_location?: string;

  protected m_stamina: number;

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
    this.m_image = image;
    this.m_description = description;
    this.m_effect = effect;
    this.m_fp = fp;
    this.m_slot = slot;
    this.m_int = int;
    this.m_faith = faith;
    this.m_arc = arc;
    this.m_bonus = bonus;
    this.m_location = location;
    this.m_stamina = stamina;
  }

  public get image(): string | undefined {
    return this.m_image;
  }

  public get description(): string {
    return this.m_description;
  }

  public get effect(): string {
    return this.m_effect;
  }

  public get fp(): string {
    return this.m_fp;
  }

  public get slot(): number {
    return this.m_slot;
  }

  public get int(): number {
    return this.m_int;
  }

  public get faith(): number {
    return this.m_faith;
  }

  public get arc(): number {
    return this.m_arc;
  }

  public get bonus(): string | undefined {
    return this.m_bonus;
  }

  public get location(): string | undefined {
    return this.m_location;
  }

  public get stamina(): number {
    return this.m_stamina;
  }

  public validate(): ValidationOutput {
    const errors = {} as Record<string, string>;

    return Object.keys(errors).length !== 0 ? errors : true;
  }
}

export default Spell;
