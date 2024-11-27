abstract class Query {
  protected _name: string | RegExp | undefined;

  constructor(name?: string | RegExp) {
    this._name = name;
  }

  public get name() : string | RegExp | undefined {
    return this._name;
  }
}

export default Query;
