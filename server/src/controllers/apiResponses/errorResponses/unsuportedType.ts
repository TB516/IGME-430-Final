import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../../models/IErrorMessage';

/**
 * Responds with a 415 unsupported media type status and the entered message
 * @param _request request object
 * @param response response object
 * @param message message to send
 * @param acceptedTypes content types the point accepts
 */
const unsupportedTypeResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage, acceptedTypes: string[]) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(415, 'Unsupported Media Type', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
    'accept-encoding': acceptedTypes,
  });

  response.write(messageJson);
  response.end();
};

/**
 * Responds with a 415 unsupported media type status and the supported types of json and urlencoded
 * @param _request request object
 * @param response response object
 * @returns
 */
const postTypeUnsupportedResponse = (_request: IncomingMessage, response: ServerResponse) => {
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
