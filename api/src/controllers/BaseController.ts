/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import Data from '../models/Data';
import IRepository from '../repositories/IRepository';

abstract class BaseController<T extends Data> {
  protected m_repository: IRepository<T>;

  constructor(repository: IRepository<T>) {
    this.m_repository = repository;
  }

  abstract getSingle(request: Request, response: Response): Promise<void>;

  abstract getMany(request: Request, response: Response): Promise<void>;

  abstract post(request: Request, response: Response): Promise<void>;

  abstract delete(request: Request, response: Response): Promise<void>;
}

export default BaseController;
