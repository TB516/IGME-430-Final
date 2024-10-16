import { ISpell } from "elden-ring-types";

export interface ISpellFormArgs{
  endpoint: string,
  method: string,
  spell: ISpell,
  callback: (response: Promise<Response>) => void
};
