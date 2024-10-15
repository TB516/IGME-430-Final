import { ISpell } from "elden-ring-types";

export interface ISpellFormArgs{
  method: string,
  spell: ISpell,
  callback: (response: Promise<Response>) => void
};
