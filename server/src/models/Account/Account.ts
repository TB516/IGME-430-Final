import { model, Schema } from 'mongoose';
import IAccount from './IAccount';
import IAccountFavorites from './IAccountFavorites';

const AccountFavSchema = new Schema<IAccountFavorites>(
  {
    incantations: [{ type: Schema.ObjectId, ref: 'Incantations' }],
    sorceries: [{ type: Schema.ObjectId, ref: 'Sorceries' }],
  },
  {
    versionKey: false,
  },
);

const AccountSchema = new Schema<IAccount>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    apiKey: { type: String },
    favorites: { type: AccountFavSchema },
  },
  {
    versionKey: false,
  },
);

const Account = model<IAccount>('Accounts', AccountSchema);
export default Account;
