"use strict"; // Dependancies

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _https = _interopRequireDefault(require("https"));

var _cors = _interopRequireDefault(require("cors"));

var _LatestDataSaver = _interopRequireDefault(require("./LatestDataSaver"));

var _routes = _interopRequireDefault(require("./routes.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dotenv = require('dotenv').config();

(0, _LatestDataSaver.default)(); // ENV

const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";
const env = process.env.ENV || "development"; // Components 

// Primary https express
const express = (0, _express.default)();

const router = _express.default.Router();

var whitelist = ['http://latvijaskoronakarte.online', 'https://latvijaskoronakarte.online', 'http://www.latvijaskoronakarte.online', 'https://www.latvijaskoronakarte.online', 'http://latvijaskoronakarte.lv', 'https://latvijaskoronakarte.lv', 'http://www.latvijaskoronakarte.lv', 'https://www.latvijaskoronakarte.lv', 'http://v1.latvijaskoronakarte.lv', 'http://www.v1.latvijaskoronakarte.lv', 'https://v1.latvijaskoronakarte.lv', 'https://www.v1.latvijaskoronakarte.lv', "http://localhost:3000"];
var corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by Corona CORS'));
    }
  }
};
express.set("env", env);
express.set("port", port);
express.use((0, _cors.default)(corsOptions));
express.use("/", router);
(0, _routes.default)(express);

if (env == "production") {
  const certOpts = {
    key: "../certificates/key.pem",
    cert: "../certificates/cert.pem"
  };

  const server = _https.default.createServer(certOpts, express);

  server.listen(port, () => {
    console.log("express server listening to port " + port);
  }); // Secondary http express

  const httpexpress = express();
  const httpRouter = express.Router();
  httpexpress.use("*", httpRouter);
  httpRouter.get("*", (req, res) => {
    const host = req.get("Host"); // replace the port in the host

    host = host.replace(/:\d+$/, ":" + express.get("port")); // determine the redirect destination

    const destination = ["https://", host, req.url].join("");
    return res.redirect(destination);
  });

  const httpServer = _http.default.createServer(httpexpress);

  httpServer.listen(80);
} else {
  const server = _http.default.createServer(express);

  server.listen(port, () => {
    console.log("express server listening to port ", host + ":" + port);
  });
}

module.exports = express;