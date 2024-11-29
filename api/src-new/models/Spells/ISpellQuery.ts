import IQuery from '../IQuery';

interface ISpellQuery extends IQuery {
  fp: string | undefined,
  slot: string | undefined,
}

export default ISpellQuery;
