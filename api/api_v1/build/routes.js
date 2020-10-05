"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import auth from "./auth"
var _default = express => {
  // express.post("/infected", auth, async (req, res) => {
  express.post("/infected", async (req, res) => {
    _fs.default.appendFile('.counter', "1 " + new Date().toUTCString() + "\n" + req.headers["user-agent"] + "\n", err => {
      if (err) {
        throw new Error("Corona error at api / path, while appending counter");
      }

      console.log("1 " + new Date().toUTCString() + "\n");
    });

    _fs.default.readFile("./parsedData/infectedPeople.json", (err, data) => {
      if (err) {
        throw new Error("Corona error reading file infectedPeople.json at api / path.");
      }

      const infectedPeopleJson = JSON.parse(data);

      if (infectedPeopleJson.hash === req.query.hash) {
        res.send(JSON.stringify({
          data: "nothingNew",
          lastUpdateTime: infectedPeopleJson.lastUpdateTime
        }));
      } else {
        res.send(infectedPeopleJson);
      }
    });
  }); //https://www.tvnet.lv/rss
  // express.post("/tvnet", auth, async (req, res) => {

  express.post("/tvnet", async (req, res) => {
    _fs.default.readFile("./parsedData/tvnetRss.json", (err, data) => {
      if (err) {
        throw new Error("Corona error reading file tvnetRss.json at api /tvnet path.");
      }

      const tvnetRssJson = JSON.parse(data);

      if (tvnetRssJson.hash === req.query.hash) {
        res.send(JSON.stringify({
          data: "nothingNew",
          lastUpdateTime: tvnetRssJson.lastUpdateTime
        }));
      } else {
        res.send(tvnetRssJson);
      }
    });
  }); // express.post("/facts", auth, async (req, res) => {

  express.post("/facts", async (req, res) => {
    _fs.default.readFile("./parsedData/facts.json", (err, data) => {
      if (err) {
        throw new Error("Corona error reading file tvnetRss.json at api /tvnet path.");
      }

      const factsJson = JSON.parse(data);

      if (factsJson.hash === req.query.hash) {
        res.send(JSON.stringify({
          data: "nothingNew",
          lastUpdateTime: factsJson.lastUpdateTime
        }));
      } else {
        res.send(factsJson);
      }
    });
  });
};

exports.default = _default;