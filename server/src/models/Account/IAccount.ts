import { ObjectId } from 'mongoose';
import IAccountFavorites from './IAccountFavorites';

interface IAccount{
  _id: ObjectId;
  username: string,
  password: string,
  apiKey: string,
  favorites: IAccountFavorites,
}
export default IAccount;
