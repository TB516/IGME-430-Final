import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../models/IErrorMessage';

const badRequestResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(400, 'Bad Request', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

const resourceNotFoundResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(404, 'Resource Not Found', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

const methodNotAllowedResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage, acceptedMethods: string[]) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(405, 'Method Not Allowed', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
    allow: acceptedMethods.join(', '),
  });

  response.write(messageJson);
  response.end();
};

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

const endpointNotFoundResponse = (request: IncomingMessage, response: ServerResponse) => {
  return resourceNotFoundResponse(request, response, {
    id: 'endpointNotFound',
    message: `The requested endpoint of ${request.url} was not found.`,
  } as IErrorMessage);
};

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

export {
  methodNotAllowedResponse,
  endpointNotFoundResponse,
  postTypeUnsupportedResponse,
  badRequestResponse,
};
