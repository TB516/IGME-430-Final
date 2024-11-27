abstract class Query {
  protected name: string | RegExp | undefined;

  constructor(name?: string | RegExp) {
    this.name = name;
  }

  public get getName() : string | RegExp | undefined {
    return this.name;
  }
}

export default Query;
