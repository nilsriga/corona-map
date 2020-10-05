"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (req, res, next) => {
  try {
    if (_jsonwebtoken.default.verify(req.headers.authorization, process.env.JWT_KEY).secret === process.env.JWT_SECRET && (req.headers.origin === process.env.UI_URL || req.headers.origin === process.env.UI_URL_LV || req.headers.origin === process.env.UI_URL_WWW || req.headers.origin === process.env.UI_URL_LV_WWW)) {
      next();
    } else {
      res.writeHead(301, {
        Location: process.env.UI_URL
      });
      res.end();
    }
  } catch (err) {
    res.writeHead(301, {
      Location: process.env.UI_URL
    });
    res.end();
  }
};

exports.default = _default;