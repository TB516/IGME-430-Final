import { Request, Response } from 'express';
import IErrorMessage from '../IErrorMessage';

/**
 * Responds with a 415 unsupported media type status and the entered message
 * @param _request request object
 * @param response response object
 * @param message message to send
 * @param acceptedTypes content types the point accepts
 */
const unsupportedTypeResponse = (_request: Request, response: Response, message: IErrorMessage, acceptedTypes: string[]) => {
  response.setHeader('accept-encoding', acceptedTypes);
  response.status(415).json(message);
};

/**
 * Responds with a 415 unsupported media type status and the supported types of json and urlencoded
 * @param _request request object
 * @param response response object
 * @returns
 */
const postTypeUnsupportedResponse = (_request: Request, response: Response) => {
  return unsupportedTypeResponse(
    _request,
    response,
    {
      id: 'unsupportedMediaType',
      message: 'The post request body was in a unsupported media format.',
    } as IErrorMessage,
    [
      'application/json',
      'application/x-www-form-urlencoded',
    ],
  );
};

export default unsupportedTypeResponse;
export { postTypeUnsupportedResponse };
