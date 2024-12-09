/* eslint-disable no-use-before-define */
import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import IAccount from './IAccount';

const salt = 10;

const AccountSchema = new Schema<IAccount>({
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
  isAdmin: {
    type: Boolean,
    required: false,
  },
  favorites: {
    type: [String],
    required: true,
  },
});

AccountSchema.statics.hash = (password: string) => {
  return bcrypt.hash(password, salt);
};

AccountSchema.statics.Validate = async (account: IAccount) => {
  const dbAccount = await Account.findOne({ username: account.username }).lean().exec();

  if (!dbAccount) {
    return false;
  }

  const match = await bcrypt.compare(account.password, dbAccount.password);

  if (!match) {
    return false;
  }

  return true;
};

const Account = model<IAccount>('Accounts', AccountSchema);

export default Account;
