import mongoose, { model } from 'mongoose';
import { container } from 'tsyringe';
import { ISpell, Spell } from '../models/Spells';
import spellSchema from '../repositories/mongo/Spells/spellSchema';
import SpellRepository from '../repositories/mongo/Spells';
import IRepository from '../repositories/IRepository';

const init = async () => {
  await mongoose.connect(process.env.MONGODB_URI!);

  const Sorceries = model<ISpell>('Sorceries', spellSchema);
  const Incantations = model<ISpell>('Incantations', spellSchema);

  container.registerInstance<IRepository<Spell>>('SorceriesRepo', new SpellRepository(Sorceries));
  container.registerInstance<IRepository<Spell>>('IncantationsRepo', new SpellRepository(Incantations));
};

export default init;
