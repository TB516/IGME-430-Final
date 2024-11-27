import Query from '../Query';

class SpellQuery extends Query {
  protected _fp: string | undefined;

  protected _slot: string | undefined;

  constructor(name?: string | RegExp, fp?: string, slot?: string) {
    super(name);
    this._fp = fp;
    this._slot = slot;
  }

  public get fp(): string | undefined {
    return this._fp;
  }

  public get slot(): string | undefined {
    return this._slot;
  }
}

export default SpellQuery;
