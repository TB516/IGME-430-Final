/* eslint-disable no-unused-vars */
import Data from '../models/Data';
import Query from '../models/Query';

interface IRepository<T extends Data> {
  search(query: Query): Promise<T[]>;

  findById(id: string): Promise<T | undefined>;

  exists(data: T): Promise<boolean>;

  create(data: T): Promise<boolean>;

  updateById(id: string, data: T): Promise<T>;

  deleteById(id: string): Promise<T>;
}

export default IRepository;
