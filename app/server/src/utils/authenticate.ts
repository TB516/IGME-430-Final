import bcrypt from 'bcrypt';
import Account from '../models/Account';
import IAccount from '../models/IAccount';

// Validate account or returns null if validation fails
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
    favoriteSorceries: dbAccount.favoriteSorceries,
    favoriteIncantations: dbAccount.favoriteIncantations,
  };
};

export default validate;
