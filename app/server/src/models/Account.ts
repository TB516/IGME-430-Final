/* eslint-disable no-use-before-define */
import { model, Schema } from 'mongoose';
import IAccount from './IAccount';

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
    isAdmin: {
      type: Boolean,
      required: false,
    },
    favoriteSorceries: {
      type: [{
        type: String,
        match: /^[a-zA-Z ]*$/,
      }],
      required: true,
    },
    favoriteIncantations: {
      type: [{
        type: String,
        match: /^[a-zA-Z ]*$/,
      }],
      required: true,
    },
  },
);

const Account = model<IAccount>('Accounts', AccountSchema);

export default Account;
