import ISpell from '../models/ISpell';
import ISpellQuery from '../models/ISpellQuery';
import { Incantations, Sorceries } from '../models/Spell';

const getSpellMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Sorceries.find(query), ...await Incantations.find(query)];
};

const getSorceryMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Sorceries.find(query)];
};

const getIncantationMatches = async (query : ISpellQuery): Promise<ISpell[]> => {
  return [...await Incantations.find(query)];
};

export { getSpellMatches, getSorceryMatches, getIncantationMatches };
