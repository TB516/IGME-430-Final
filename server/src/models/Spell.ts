import { model, Schema } from 'mongoose';
import ISpell from './ISpell';
import IStatReq from './IStatReq';

const reqSchema = new Schema<IStatReq>({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
});

const spellSchema = new Schema<ISpell>({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  cost: { type: Number, required: true },
  slots: { type: Number, required: true },
  effects: { type: String, required: true },
  requires: { type: [reqSchema], required: true },
});

const Incantations = model<ISpell>('Incantations', spellSchema);
const Sorceries = model<ISpell>('Sorceries', spellSchema);

export { Incantations, Sorceries };
