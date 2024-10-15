import ISpellQuery from "../models/ISpellQuery";

export abstract class SpellService{
  private static SpellsUrl = "/api/spells";

  public static GetEndpointResponse = async (urlExtension: string, args?: ISpellQuery) => {
    const searchParams = args? `name=${args.name}&cost=${args.cost}&slots=${args.slots}` : '';
    return await fetch(`${this.SpellsUrl}${urlExtension}?${searchParams}`, {
      method: "GET"
    });
  };
}