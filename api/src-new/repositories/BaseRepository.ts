/* eslint-disable no-unused-vars */
import IQuery from '../models/IQuery';

abstract class BaseRepository<T> {
  abstract search(query: IQuery): Promise<T[]>;

  abstract findById(id: string): Promise<T | undefined>;

  abstract exists(data: T): Promise<boolean>;

  abstract create(data: T): Promise<boolean>;

  abstract updateById(id: string, data: T): Promise<T>;

  abstract deleteById(id: string): Promise<T>;
}

export default BaseRepository;
