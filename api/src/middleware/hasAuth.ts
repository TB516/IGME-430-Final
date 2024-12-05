import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import * as errors from '../utils/error/client';

interface JWTBody {
  isAdmin: boolean,
}

const hasAuth = (request: Request, response: Response, next: NextFunction) => {
  try {
    const token = request.headers.authorization ? request.headers.authorization.replace('Bearer', '') : '';

    const payload = verify(token, process.env.AUTH_SECRET!) as JWTBody;

    if (!payload.isAdmin) {
      errors.unauthorizedResponse(request, response);
      return;
    }

    next();
  } catch {
    errors.unauthorizedResponse(request, response);
  }
};

export default hasAuth;
