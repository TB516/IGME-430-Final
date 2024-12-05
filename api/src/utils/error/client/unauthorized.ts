import { Request, Response } from 'express';
import IErrorMessage from '../IErrorMessage';

const unauthorizedResponse = (_request: Request, response: Response, message: IErrorMessage = { id: '401', message: 'You do not have the authorization to access this resource.' }) => {
  response.status(401).json(message);
};

export default unauthorizedResponse;
