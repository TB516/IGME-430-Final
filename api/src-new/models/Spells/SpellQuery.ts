import Query from '../Query';
import ISpellQuery from './ISpellQuery';

class SpellQuery extends Query implements ISpellQuery {
  protected m_fp: string | undefined;

  protected m_slot: string | undefined;

  constructor(name?: string | RegExp, fp?: string, slot?: string) {
    super(name);
    this.m_fp = fp;
    this.m_slot = slot;
  }

  public get fp(): string | undefined {
    return this.m_fp;
  }

  public get slot(): string | undefined {
    return this.m_slot;
  }
}

export default SpellQuery;
