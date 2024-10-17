import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../../models/IErrorMessage';

/**
 * Responds with a 415 status, and the entered message. Headers contain accepted methods.
 * @param _request request object
 * @param response response object
 * @param message message to send
 * @param acceptedMethods valid request method
 */
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

export default methodNotAllowedResponse;
