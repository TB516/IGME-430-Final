import { model } from 'mongoose';
import ISpell from '../../../models/Spells/ISpell';
import spellSchema from './spellSchema';

const Incantations = model<ISpell>('Incantations', spellSchema);

export default Incantations;
