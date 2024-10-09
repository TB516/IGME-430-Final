import { IncomingMessage, ServerResponse } from 'http';
import IErrorMessage from '../../../models/IErrorMessage';

const badRequestResponse = (_request: IncomingMessage, response: ServerResponse, message: IErrorMessage) => {
  const messageJson = JSON.stringify(message);

  response.writeHead(400, 'Bad Request', {
    'content-type': 'application/json',
    'content-length': Buffer.byteLength(messageJson, 'utf8'),
  });

  response.write(messageJson);
  response.end();
};

export default badRequestResponse;
