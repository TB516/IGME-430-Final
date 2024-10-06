interface ISpell{
  name: string | RegExp,
  type: string | RegExp,
  cost: number,
  slots: number,
}

export default ISpell;
