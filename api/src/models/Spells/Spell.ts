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

    if (!this.m_name || !(/^[a-zA-Z ]*$/.test(this.m_name))) {
      errors.name = 'Name must be defined and only contain letters and numbers.';
    }
    if (!this.m_description) {
      errors.description = 'A description must be provided!';
    }
    if (!this.m_effect) {
      errors.effect = 'A effect must be provided!';
    }
    if (!this.m_fp) {
      errors.fp = 'A fp cost must be provided!';
    }
    if (Number.isNaN(this.m_slot)) {
      errors.slot = 'A slot count must be provided as a integer!';
    }
    if (Number.isNaN(this.m_int)) {
      errors.int = 'An int requirement must be provided as a integer!';
    }
    if (Number.isNaN(this.m_faith)) {
      errors.faith = 'A faith requirement must be provided as a integer!';
    }
    if (Number.isNaN(this.m_arc)) {
      errors.arc = 'An arcane requirement must be provided as a integer!';
    }
    if (Number.isNaN(this.m_stamina)) {
      errors.arc = 'An stamina usage amount must be provided as a integer!';
    }

    return errors;
  }
}

export default Spell;
