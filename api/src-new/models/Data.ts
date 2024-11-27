abstract class Data {
  protected id: string | undefined;

  protected name: string;

  constructor(id: string | undefined, name: string) {
    this.id = id;
    this.name = name;
  }

  public get getId() : string | undefined {
    return this.id;
  }

  public get getName() : string {
    return this.name;
  }
}

export default Data;
