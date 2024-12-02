import { Request, Response } from 'express';
import IErrorMessage from '../IErrorMessage';

/**
 * Responds with a 404 resource not found status.
 * @param _request request object
 * @param response response object
 * @param message message to send
 */
const resourceNotFoundResponse = (_request: Request, response: Response, message: IErrorMessage) => {
  response.status(404).json(message);
};

/**
 * Responds with a 404 endpoint not found status specifying that the requested API endpoint doesnt exist.
 * @param request request object
 * @param response response object
 * @returns
 */
const endpointNotFoundResponse = (request: Request, response: Response) => {
  return resourceNotFoundResponse(request, response, {
    id: 'endpointNotFound',
    message: `The requested endpoint of ${request.url} was not found.`,
  } as IErrorMessage);
};

export default resourceNotFoundResponse;
export { endpointNotFoundResponse };
