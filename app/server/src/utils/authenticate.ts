import bcrypt from 'bcrypt';
import Account from '../models/Account';
import IAccount from '../models/IAccount';

const validate = async (account: IAccount): Promise<IAccount | null> => {
  const dbAccount = await Account.findOne({ username: account.username }).exec();

  if (!dbAccount) {
    return null;
  }

  const match = await bcrypt.compare(account.password, dbAccount.password);

  if (!match) {
    return null;
  }

  return {
    _id: dbAccount._id,
    username: dbAccount.username,
    password: dbAccount.password,
    isAdmin: dbAccount.isAdmin,
    favorites: dbAccount.favorites,
  };
};

export default validate;
