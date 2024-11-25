import IQuery from '../IQuery';

interface ISpellQuery extends IQuery{
  fp?: number,
  slot?: number,
}

export default ISpellQuery;
