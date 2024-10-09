import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../../models/IErrorMessage';

const resourceNotFoundResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(404, 'Resource Not Found', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

const endpointNotFoundResponse = (request: IncomingMessage, response: ServerResponse) => {
  return resourceNotFoundResponse(request, response, {
    id: 'endpointNotFound',
    message: `The requested endpoint of ${request.url} was not found.`,
  } as IErrorMessage);
};

export default resourceNotFoundResponse;
export { endpointNotFoundResponse };
