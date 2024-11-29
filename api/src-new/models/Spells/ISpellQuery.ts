import IQuery from '../IQuery';

interface ISpellQuery extends IQuery {
  fp: RegExp | undefined,
  slot: number | undefined,
}

export default ISpellQuery;
