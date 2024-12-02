import { Request, Response } from 'express';
import IErrorMessage from '../IErrorMessage';

/**
 * Responds with a 405 status, and the entered message. Headers contain accepted methods.
 * @param _request request object
 * @param response response object
 * @param message message to send
 * @param acceptedMethods valid request method
 */
const methodNotAllowedResponse = (_request: Request, response: Response, message: IErrorMessage, acceptedMethods: string[]) => {
  response.setHeader('allow', acceptedMethods.join(', '));
  response.status(405).json(message);
};

export default methodNotAllowedResponse;
