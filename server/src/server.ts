import http, { IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import { getIndexCss, getIndexHtml, getIndexJs } from './controllers/htmlResponses';
import {
  spellsResponse,
  sorceriesResponse,
  incantationsResponse,
} from './controllers/apiResponses/spells';
import { endpointNotFoundResponse } from './controllers/apiResponses/errorResponses';

require('dotenv').config();

// eslint-disable-next-line no-unused-vars, max-len
type ResponseMethod = (request: IncomingMessage, response: ServerResponse) => void;
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const routes: Record<string, ResponseMethod> = {
  '/': getIndexHtml,
  '/assets/index.css': getIndexCss,
  '/assets/index.js': getIndexJs,
  '/api/spells': spellsResponse,
  '/api/spells/sorceries': sorceriesResponse,
  '/api/spells/incantations': incantationsResponse,
};

const onRequest = (request: IncomingMessage, response: ServerResponse) => {
  const parsedUrl = new URL(request.url!, `https://${request.headers.host}`);

  if (routes[parsedUrl.pathname]) {
    return routes[parsedUrl.pathname](request, response);
  }
  if (parsedUrl.pathname.startsWith('/api/')) {
    return endpointNotFoundResponse(request, response);
  }

  return routes['/'](request, response);
};

mongoose.connect(process.env.MONGODB_URI!).catch((err) => { console.log(err); });

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port:${port}`);
});
