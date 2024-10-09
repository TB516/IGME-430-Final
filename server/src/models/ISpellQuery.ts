interface ISpellQuery{
  name: string | RegExp,
  cost: number,
  slots: number,
}

export default ISpellQuery;
