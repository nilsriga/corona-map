"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getGoogleSheetsJson;

var _axios = _interopRequireDefault(require("axios"));

var _csv = _interopRequireDefault(require("csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dotenv = require('dotenv').config();

async function getGoogleSheetsJson(type) {
  var googleSheetsCsv;

  if (type === "infected") {
    googleSheetsCsv = await _axios.default.get(process.env.GOOGLE_SHEETS_URL);
  } else if (type == "facts") {
    googleSheetsCsv = await _axios.default.get(process.env.GOOGLE_SHEETS_URL_FACTS);
  } else {
    googleSheetsCsv = await _axios.default.get(process.env.GOOGLE_SHEETS_URL);
  }

  var _converting = new Promise((resolve, reject) => {
    _csv.default.parse(googleSheetsCsv.data, {
      columns: true
    }, function (err, data) {
      resolve(JSON.stringify(type === "infected" ? data.reverse() : data, null, 2));
    });
  });

  var googleSheetsJson = await _converting;
  return await googleSheetsJson;
}