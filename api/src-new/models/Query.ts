import IQuery from './IQuery';

abstract class Query implements IQuery {
  protected m_name: string | RegExp | undefined;

  constructor(name?: string | RegExp) {
    this.m_name = name;
  }

  public get name() : string | RegExp | undefined {
    return this.m_name;
  }
}

export default Query;
