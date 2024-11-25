import { model } from 'mongoose';
import ISpell from '../../../models/Spells/ISpell';
import spellSchema from './spellSchema';

const Sorceries = model<ISpell>('Sorceries', spellSchema);

export default Sorceries;
