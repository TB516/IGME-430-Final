import ISpellQuery from "../models/ISpellQuery";

export abstract class SpellService{
  private static SpellsUrl = "/api/spells";

  public static RequestEndpointResponse = async (urlExtension: string, args?: ISpellQuery, method: string = "GET") => {
    const searchParams = args? `name=${args.name}&cost=${Number.isNaN(args.cost) ? "" : args.cost}&slots=${Number.isNaN(args.slots) ? "" : args.slots}` : '';
    return await fetch(`${this.SpellsUrl}${urlExtension}?${searchParams}`, {
      method: method
    });
  };
}
