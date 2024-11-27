abstract class Data {
  protected _id: string | undefined;

  protected _name: string;

  constructor(id: string | undefined, name: string) {
    this._id = id;
    this._name = name;
  }

  public get id() : string | undefined {
    return this._id;
  }

  public get name() : string {
    return this._name;
  }
}

export default Data;
