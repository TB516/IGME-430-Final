import Query from '../Query';

class SpellQuery extends Query {
  protected fp: string | undefined;

  protected slot: string | undefined;

  constructor(name?: string | RegExp, fp?: string, slot?: string) {
    super(name);
    this.fp = fp;
    this.slot = slot;
  }

  public get getFp(): string | undefined {
    return this.fp;
  }

  public get getSlot(): string | undefined {
    return this.slot;
  }
}

export default SpellQuery;
