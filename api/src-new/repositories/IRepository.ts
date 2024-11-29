/* eslint-disable no-unused-vars */
import Data from '../models/Data';
import Query from '../models/Query';

interface IRepository<T extends Data> {
  search(query: Query): Promise<T[]>;

  findById(id: string): Promise<T | null>;

  exists(data: T): Promise<string | null>;

  create(data: T): Promise<T | null>;

  updateById(id: string, data: T): Promise<T | null>;

  deleteById(id: string): Promise<T | null>;
}

export default IRepository;
