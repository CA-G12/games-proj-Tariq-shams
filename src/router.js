/* eslint-disable linebreak-style */

const fs = require('fs');
const path = require('path');

const router = (req, res) => {
  const endpoint = req.url;

  if (endpoint === '/') {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (endpoint === '/style.css') {
    const filePath = path.join(__dirname, '..', 'public', 'style.css');
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end(data);
      }
    });
  } else if (endpoint === '/js/dom.js') {
    const filePath = path.join(__dirname, '..', 'public', 'js', 'dom.js');
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.end(data);
      }
    });
  } else if (endpoint === '/js/fetch.js') {
    const filePath = path.join(__dirname, '..', 'public', 'js', 'fetch.js');
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { 'Content-Type': 'text/html' });
      } else {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
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
