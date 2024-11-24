interface ISpell{
  _id?: string,
  name: string,
  image?: string,
  description: string,
  effect: string,
  fp: string,
  slot: number,
  int: number,
  faith: number,
  arc: number,
  bonus?: string,
  location?: string,
  stamina: number,
}

export default ISpell;
