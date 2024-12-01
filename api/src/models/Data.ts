import IData from './IData';

abstract class Data implements IData {
  protected m_id: string | undefined;

  protected m_name: string;

  constructor(id: string | undefined, name: string) {
    this.m_id = id;
    this.m_name = name;
  }

  public get _id() : string | undefined {
    return this.m_id;
  }

  public set _id(id: string | undefined) {
    this.m_id = id;
  }

  public get name() : string {
    return this.m_name;
  }
}

export default Data;
