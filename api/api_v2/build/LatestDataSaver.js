"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = latestDataSaver;

var _SheetsController = _interopRequireDefault(require("./SheetsController.js"));

var _fs = _interopRequireDefault(require("fs"));

var _rssParser = _interopRequireDefault(require("rss-parser"));

var _auth = _interopRequireDefault(require("./auth"));

var _objectHash = _interopRequireDefault(require("object-hash"));

var _moment = _interopRequireDefault(require("moment"));

require("moment/locale/lv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_moment.default.locale('lv');

const ASQ = require("asynquence");

const parser = new _rssParser.default();
const keywords = [/korona/gi, /virus/gi, /viruss/gi, /corona/gi, /covid/gi, /19/gi, /atklāts/gi, /konstatēts/gi, /konstatets/gi, /izplatība/gi, /petijums/gi, /pētijums/gi, /covid-19/gi, /koronavīrusa/gi, /gadijums/gi, /covid/gi, /korona/gi];

function getLastUpdateTime(timeNow, type, data, oldData) {
  const newDataHash = (0, _objectHash.default)(data);
  const oldDataHash = oldData.hash;
  let somethingNew = oldDataHash === newDataHash ? false : true;
  const newfactsLastUpdateTime = somethingNew === false ? oldData.lastUpdateTime : timeNow;

  if ((0, _moment.default)(timeNow).diff(oldData.lastUpdateTime, "days") !== 0) {
    somethingNew = true;
  }

  return {
    shouldUpdate: somethingNew,
    lastUpdateTime: newfactsLastUpdateTime,
    newHash: somethingNew ? newDataHash : oldDataHash
  };
}

function addHashToEach(jsonOrString, tvnetRss) {
  const json = typeof jsonOrString === "string" ? JSON.parse(jsonOrString) : jsonOrString;

  if (!tvnetRss) {
    return json.map((el, i, arr) => {
      let concatenatedValues = "";

      for (let prop in el) {
        concatenatedValues = concatenatedValues.concat(el[prop]);
      }

      const hash = (0, _objectHash.default)(concatenatedValues);
      el.hash = hash;
      return el;
    });
  } else {
    return json.map((el, i, arr) => {
      const hash = (0, _objectHash.default)(el.content);
      el.hash = hash;
      return el;
    });
  }
}

function getActiveCasesCount(newInfectedPeople) {
  let count = 0;
  newInfectedPeople.forEach(person => {
    // console.log(person.isRecovered)
    // console.log(count)
    if (person.isRecovered === "0" && person.isDead === "0") {
      // console.log("person", person.isRecovered)
      count = count + 1; // console.log(count)
    }
  });
  return count;
}

async function latestDataSaver(type) {
  setInterval(async () => {
    const timeNow = (0, _moment.default)().format('D.M.YY, HH:mm');
    let oldInfectedPeopleJson = {};
    let oldTvnetRssJson = {};
    let oldFactsJson = {};
    ASQ().then(async (done, msg) => {
      oldInfectedPeopleJson = JSON.parse(_fs.default.readFileSync("./parsedData/infectedPeople.json", "utf8"));
      oldTvnetRssJson = JSON.parse(_fs.default.readFileSync("./parsedData/tvnetRss.json", "utf8"));
      oldFactsJson = JSON.parse(_fs.default.readFileSync("./parsedData/facts.json", "utf8"));
      done();
    }).then(async (done, msg) => {
      // this updates infectedPeople.json
      const newInfectedGoogleSheetsJson = await (0, _SheetsController.default)("infected");
      const infectedPartial = getLastUpdateTime(timeNow, "infectedPeople", newInfectedGoogleSheetsJson, oldInfectedPeopleJson);
      const newInfectedPeopleLastUpdateTime = infectedPartial.lastUpdateTime;

      if (infectedPartial.shouldUpdate) {
        const infectedWithHash = addHashToEach(newInfectedGoogleSheetsJson);
        const metadata = {
          howManyInfectedToday: 0,
          whereTodayInfected: {},
          activeCasesCount: getActiveCasesCount(infectedWithHash)
        };
        const placesWithInfectedToday = [];
        infectedWithHash.forEach(el => {
          if (el.dateOfDiagnosisBroadcast === (0, _moment.default)().format("DD.MM.YY")) {
            // console.log(el.selfCity)
            metadata.howManyInfectedToday++;
            placesWithInfectedToday.push(el.selfCity);
          }
        });

        for (var i = 0; i < placesWithInfectedToday.length; i++) {
          metadata.whereTodayInfected[placesWithInfectedToday[i]] = 1 + (metadata.whereTodayInfected[placesWithInfectedToday[i]] || 0);
        } // console.log(metadata)


        _fs.default.writeFileSync("./parsedData/infectedPeople.json", JSON.stringify({
          data: infectedWithHash,
          lastUpdateTime: newInfectedPeopleLastUpdateTime,
          hash: infectedPartial.newHash,
          metadata: metadata
        }));
      } // this updates facts.json


      const newFactsGoogleSheetsJson = await (0, _SheetsController.default)("facts");
      const factsPartial = getLastUpdateTime(timeNow, "facts", await newFactsGoogleSheetsJson, oldFactsJson);
      const newFactsLastUpdateTime = factsPartial.lastUpdateTime;

      if (factsPartial.shouldUpdate) {
        const factsWithHash = addHashToEach(newFactsGoogleSheetsJson);

        _fs.default.writeFileSync("./parsedData/facts.json", JSON.stringify({
          data: factsWithHash,
          lastUpdateTime: newFactsLastUpdateTime,
          hash: factsPartial.newHash,
          metadata: {}
        }));
      }

      done();
    }); // this parses tvnetRss

    ASQ().then(async (done, msg) => {
      let getRss = async () => {
        let feed = await parser.parseURL('https://www.tvnet.lv/rss');
        let filtered = feed.items.filter((el, i, arr) => {
          let filteredTemp = keywords.map((el2, i, arr) => {
            return el2.test(el.title);
          });
          return filteredTemp.includes(true) ? el : "";
        });
        return filtered;
      };

      done(await getRss());
    }).then((done, tvnetRss) => {
      const tvnetRssPartial = getLastUpdateTime(timeNow, "tvnetRss", tvnetRss, oldTvnetRssJson);
      const newTvnetRssLastUpdateTime = tvnetRssPartial.lastUpdateTime;

      if (tvnetRssPartial.shouldUpdate) {
        const tvnetRssWithHash = addHashToEach(tvnetRss, "tvnetRss");

        _fs.default.writeFileSync("./parsedData/tvnetRss.json", JSON.stringify({
          data: tvnetRssWithHash,
          lastUpdateTime: newTvnetRssLastUpdateTime,
          hash: tvnetRssPartial.newHash,
          metadata: {}
        }));
      }
    });
  }, 90000);
}