/* eslint-disable linebreak-style */

const fs = require("fs");
const path = require("path");
const https = require("https");

const mimTypes = {
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".png": "image/png",
};

const router = (req, res) => {
  const endpoint = req.url;
  const extension = path.extname(endpoint);

  if (endpoint === "/") {
    const filePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { "Content-Type": "text/html" });
        res.write("Sorry, we are working on this problem ^_^");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else if (
    endpoint === "/style.css" ||
    endpoint === "/js/dom.js" ||
    endpoint === "/js/fetch.js" ||
    endpoint ===
      "/https://cdn-icons.flaticon.com/png/512/1722/premium/1722368.png?token=exp=1660293270~hmac=4785603b42dc269aa642a32fa55e8cfb"
  ) {
    const filePath = path.join(__dirname, "..", "public", endpoint);
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(505, { "Content-Type": "text/html" });
        res.write("Sorry, we are working on this problem ^_^");
      } else {
        res.writeHead(200, { "Content-Type": mimTypes[extension] });
        res.end(data);
      }
    });
  } else if (endpoint === "/api.json") {
    const pathFile = path.join(__dirname, "..", "/api.json");
    fs.readFile(pathFile, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (endpoint === "/data.json") {
    const pathFile = path.join(__dirname, "..", "/data.json");
    fs.readFile(pathFile, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
      }
    });
  } else if (endpoint.includes("/games")) {
    let game = endpoint.split("/")[2];
    game = game.split("%20").join(" ");

    const pathFile = path.join(__dirname, "../data.json");
    fs.readFile(pathFile, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`<h1>Internal Server Error</h1>`);
      } else {
        let parsedData = JSON.parse(data);
        const values = parsedData.map((x) => {
          return x["name"];
        });
        const filterResults = values.filter((ele) => {
          return ele.toLowerCase().includes(game.toLowerCase());
        });
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(filterResults));
      }
    });
  } else if (endpoint.includes("/api")) {
    let name = endpoint.split("/")[2];
    name = name.split("%20").join(" ");
    let getData = "";
    https.get(`https://www.freetogame.com/api/games?q=${name}`, (req) => {
      req.on("data", (chunks) => {
        getData += chunks;
      });

      req
        .on("end", () => {
          let parsed = JSON.parse(getData);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(parsed));
        })
        .on("error", (e) => {
          console.error(`Got error: ${e.message}`);
        });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("This page Not Found!!");
    res.end();
  }
};

module.exports = router;
