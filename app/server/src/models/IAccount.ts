import { ObjectId } from 'mongoose';

// Account interface to map data
interface IAccount {
  _id: ObjectId
  username: string,
  password: string,
  isAdmin: boolean
  favoriteSorceries: string[],
  favoriteIncantations: string[]
}

export default IAccount;
