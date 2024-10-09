import ISpell from '../../../models/ISpell';
import ISpellQuery from '../../../models/ISpellQuery';
import { Incantations, Sorceries } from '../../../models/Spell';

// eslint-disable-next-line no-unused-vars
type dbQuery = (query: ISpellQuery) => Promise<ISpell[]>;

const getSpellMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Sorceries.find(query), ...await Incantations.find(query)];
};

const getSorceryMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Sorceries.find(query)];
};

const getIncantationMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Incantations.find(query)];
};

export {
  dbQuery,
  getSpellMatches,
  getSorceryMatches,
  getIncantationMatches,
};
