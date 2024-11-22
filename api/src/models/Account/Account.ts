import { model, Schema } from 'mongoose';
import IAccount from './IAccount';
import IAccountFavorites from './IAccountFavorites';

const AccountFavSchema = new Schema<IAccountFavorites>(
  {
    incantations: [{
      type: Schema.ObjectId,
      ref: 'Incantations',
    }],
    sorceries: [{
      type: Schema.ObjectId,
      ref: 'Sorceries',
    }],
  },
  {
    versionKey: false,
  },
);

const AccountSchema = new Schema<IAccount>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^[A-Za-z0-9_\-.]{1,16}$/,
    },
    password: {
      type: String,
      required: true,
    },
    apiKey: {
      type: String,
    },
    favorites: {
      type: AccountFavSchema,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

const Account = model<IAccount>('Accounts', AccountSchema);
export default Account;
