import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../../models/IErrorMessage';

/**
 * Responds with a 404 resource not found status.
 * @param _request request object
 * @param response response object
 * @param message message to send
 */
const resourceNotFoundResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(404, 'Resource Not Found', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

/**
 * Responds with a 404 endpoint not found status specifying that the requested API endpoint doesnt exist.
 * @param request request object
 * @param response response object
 * @returns
 */
const endpointNotFoundResponse = (request: IncomingMessage, response: ServerResponse) => {
  return resourceNotFoundResponse(request, response, {
    id: 'endpointNotFound',
    message: `The requested endpoint of ${request.url} was not found.`,
  } as IErrorMessage);
};

export default resourceNotFoundResponse;
export { endpointNotFoundResponse };
