import http, { IncomingMessage, ServerResponse } from 'http';
import { getIndexCss, getIndexHtml, getIndexJs } from './responses/htmlResponses.js';

// eslint-disable-next-line no-unused-vars, max-len
type ResponseMethod = (arg1: IncomingMessage, arg2: ServerResponse) => void;

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const routes: Record<string, ResponseMethod> = {
  '/': getIndexHtml,
  '/assets/index.css': getIndexCss,
  '/assets/index.js': getIndexJs,
  '/404' : () => {},
};

const onRequest = (request: IncomingMessage, response: ServerResponse) => {
  const parsedUrl = new URL(request.url!, `https://${request.headers.host}`);

  console.log(parsedUrl.pathname)

  if (routes[parsedUrl.pathname]) {
    return routes[parsedUrl.pathname](request, response);
  }

  return routes['/404'](request, response);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on port:${port}`);
});