import { ObjectId } from 'mongoose';
import IStatReq from './IStatReq';

interface ISpell{
  _id: ObjectId,
  id: string,
  name: string,
  image: string,
  description: string,
  type: string,
  cost: number,
  slots: number,
  effects: string,
  requires: IStatReq[],
}

export default ISpell;
