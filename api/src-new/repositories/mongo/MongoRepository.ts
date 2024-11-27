/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import IRepository from '../IRepository';
import Data from '../../models/Data';
import Query from '../../models/Query';

abstract class MongoRepository<T extends Data> implements IRepository<T> {
  protected _connection: mongoose.Connection;

  protected _model: mongoose.Model<T>;

  constructor(connection: mongoose.Connection, schema: mongoose.Schema<T>, collectionName: string) {
    this._connection = connection;
    this._model = this._connection.model<T>(collectionName, schema);
  }

  abstract search(query: Query): Promise<T[]>;

  abstract findById(id: string): Promise<T | undefined>;

  abstract exists(spell: T): Promise<boolean>;

  abstract create(spell: T): Promise<boolean>;

  abstract updateById(id: string, spell: T): Promise<T>;

  abstract deleteById(id: string): Promise<T>;
}

export default MongoRepository;
