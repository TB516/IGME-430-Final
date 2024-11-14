import { ObjectId } from 'mongoose';

interface IAccountFavorites{
  sorceries: ObjectId[],
  incantations: ObjectId[],
}

export default IAccountFavorites;
