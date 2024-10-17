import { ISpell } from 'elden-ring-types';
import ISpellQuery from '../../../models/ISpellQuery';
import { Incantations, Sorceries } from '../../../models/Spell';

// eslint-disable-next-line no-unused-vars
type dbQuery = (query: ISpellQuery) => Promise<ISpell[]>;

/**
 * Searches sorceries and incantations for matches of the query
 * @param query query to search for
 * @returns
 */
const getSpellMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Sorceries.find(query), ...await Incantations.find(query)];
};

/**
 * Searches sorceries for matches of the query
 * @param query query to search for
 * @returns
 */
const getSorceryMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Sorceries.find(query)];
};

/**
 * Searches incantations for matches of the query
 * @param query query to search for
 * @returns
 */
const getIncantationMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Incantations.find(query)];
};

export {
  dbQuery,
  getSpellMatches,
  getSorceryMatches,
  getIncantationMatches,
};
