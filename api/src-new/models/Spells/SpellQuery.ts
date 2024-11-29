import Query from '../Query';
import ISpellQuery from './ISpellQuery';

class SpellQuery extends Query implements ISpellQuery {
  protected m_fp: RegExp | undefined;

  protected m_slot: number | undefined;

  constructor(name?: string, fp?: string, slot?: number) {
    super(name);
    this.m_fp = fp ? new RegExp(fp, 'i') : undefined;
    this.m_slot = slot;
  }

  public get fp(): RegExp | undefined {
    return this.m_fp;
  }

  public get slot(): number | undefined {
    return this.m_slot;
  }
}

export default SpellQuery;
