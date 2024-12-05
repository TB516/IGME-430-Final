import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as errors from '../utils/error/client';

const hasAuth = (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization ? request.headers.authorization.replace('Bearer', '').trim() : '';

    verify(token, process.env.AUTH_SECRET!);

    next();
  } catch {
    errors.unauthorizedResponse(request, response);
  }
};

export default hasAuth;
