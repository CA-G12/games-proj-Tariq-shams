/* eslint-disable linebreak-style */
const http = require('http');
const router = require('./router');

const port = 3003;
http.createServer(router).listen(port, () => {});
