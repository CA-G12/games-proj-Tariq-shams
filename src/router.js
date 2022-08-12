/* eslint-disable linebreak-style */

const fs = require('fs');
const path = require('path');

const mimTypes = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
};

const router = (req, res) => {
  const endpoint = req.url;
  const extension = path.extname(endpoint);

  if (endpoint === '/') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
        res.write('Sorry, we are working on this problem ^_^');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (endpoint === '/style.css'
          || endpoint === '/js/dom.js'
          || endpoint === '/js/fetch.js'
          || endpoint === '/https://cdn-icons.flaticon.com/png/512/1722/premium/1722368.png?token=exp=1660293270~hmac=4785603b42dc269aa642a32fa55e8cfb') {
    const filePath = path.join(__dirname, '..', 'public', endpoint);
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
        res.write('Sorry, we are working on this problem ^_^');
      } else {
        res.writeHead(200, { 'Content-Type': mimTypes[extension] });
        res.end(data);
      }
    });
  } else if (endpoint === '/api.json'
          || endpoint === '/data.json') {
    const filePath = path.join(__dirname, '..', endpoint);
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
        res.write('Sorry, we are working on this problem ^_^');
      } else {
        res.writeHead(200, { 'Content-Type': mimTypes[extension] });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('This page Not Found!!');
    res.end();
  }
};

module.exports = router;
