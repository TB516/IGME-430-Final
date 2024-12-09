import { ObjectId } from 'mongoose';

interface IAccount {
  _id: ObjectId
  username: string,
  password: string,
  isAdmin: boolean
  favorites: string[]
}

export default IAccount;
