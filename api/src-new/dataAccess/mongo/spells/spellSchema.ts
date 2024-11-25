import { Schema } from 'mongoose';
import ISpell from '../../../models/Spells/ISpell';

const spellSchema = new Schema<ISpell>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    effect: {
      type: String,
      required: true,
    },
    fp: {
      type: String,
      required: true,
    },
    slot: {
      type: Number,
      required: true,
    },
    int: {
      type: Number,
      required: true,
    },
    faith: {
      type: Number,
      required: true,
    },
    arc: {
      type: Number,
      required: true,
    },
    bonus: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    stamina: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default spellSchema;
