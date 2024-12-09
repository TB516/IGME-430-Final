import { ObjectId } from 'mongoose';

interface IAccount {
  _id: ObjectId
  username: string,
  password: string,
  isAdmin: boolean
  favoriteSorceries: string[],
  favoriteIncantations: string[]
}

export default IAccount;
