/* eslint-disable linebreak-style */

const http = require('http');
const router = require('./router');

const port = 3003;

http.createServer(router).listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`We listening on http://localhost:${port}`);
});
