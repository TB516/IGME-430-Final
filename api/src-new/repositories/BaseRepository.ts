/* eslint-disable no-unused-vars */
import Data from '../models/Data';
import Query from '../models/Query';

abstract class BaseRepository<T extends Data> {
  abstract search(query: Query): Promise<T[]>;

  abstract findById(id: string): Promise<T | undefined>;

  abstract exists(data: T): Promise<boolean>;

  abstract create(data: T): Promise<boolean>;

  abstract updateById(id: string, data: T): Promise<T>;

  abstract deleteById(id: string): Promise<T>;
}

export default BaseRepository;
