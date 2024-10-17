import { ISpell } from "elden-ring-types";
import ISpellQuery from "../models/ISpellQuery";

export abstract class SpellService{
  public static GetEndpointResponse = async (endpoint: string, args?: ISpellQuery, method: string = "GET") => {
    const searchParams = args? `name=${args.name}&cost=${Number.isNaN(args.cost) ? "" : args.cost}&slots=${Number.isNaN(args.slots) ? "" : args.slots}` : '';
    return await fetch(`${endpoint}?${searchParams}`, {
      method: method,
      headers: {
        'accept': 'application/json'
      }
    });
  };

  public static PostEndpointResponse = async (endpoint: string, spell: ISpell,) => {
    return await fetch(`${endpoint}`, {
      body: JSON.stringify(spell),
      method: 'POST',
      headers:{
        'accept': 'application/json',
        'content-type': 'application/json'
      }
    });
  };
}
