import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../../models/IErrorMessage';

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
