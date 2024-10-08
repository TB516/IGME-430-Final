interface ISpellQuery{
  name: string | RegExp,
  type: string | RegExp,
  cost: number,
  slots: number,
}

export default ISpellQuery;
