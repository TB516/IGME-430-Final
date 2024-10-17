import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';

let htmlPath: fs.PathOrFileDescriptor;
let cssPath: fs.PathOrFileDescriptor;
let bundlePath: fs.PathOrFileDescriptor;

if (process.env.NODE_ENV === 'production') {
  htmlPath = `${__dirname}/../../client/index.html`;
  cssPath = `${__dirname}/../../client/assets/index.css`;
  bundlePath = `${__dirname}/../../client/assets/index.js`;
} else {
  htmlPath = `${__dirname}/../../../dist/client/index.html`;
  cssPath = `${__dirname}/../../../dist/client/assets/index.css`;
  bundlePath = `${__dirname}/../../../dist/client/assets/index.js`;
}

const index = fs.readFileSync(htmlPath);
const css = fs.readFileSync(cssPath);
const js = fs.readFileSync(bundlePath);

/**
 * returns index html file
 * @param _request
 * @param response
 */
const getIndexHtml = (_request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

/**
 * return index css file
 * @param _request
 * @param response
 */
const getIndexCss = (_request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

/**
 * returns index js file
 * @param _request
 * @param response
 */
const getIndexJs = (_request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(js);
  response.end();
};

export { getIndexHtml, getIndexCss, getIndexJs };
