import express from 'express';
// import http from "http"
import https from "https"
// import request from "request"
const app = express();
// const dotenv = require('dotenv').config();
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./api/swagger.json');
// const Sentry = require('@sentry/node');
// const fs = require('fs');

let appPort = process.env.APP_PORT
let domain = process.env.domain + ":" + appPort


// request(" https://maps.googleapis.com/maps/api/staticmap?key=YOUR_API_KEY&center=56.941108341156905,24.013074705794548&zoom=11&format=png&maptype=roadmap&style=element:geometry%7Ccolor:0x1d2c4d&style=element:geometry.fill%7Ccolor:0xe95256&style=element:labels.icon%7Cvisibility:off&style=element:labels.text%7Ccolor:0x51bfea%7Cweight:8&style=element:labels.text.fill%7Ccolor:0x0bf0f0&style=element:labels.text.stroke%7Ccolor:0x1a3646%7Cvisibility:off&style=feature:administrative.country%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.land_parcel%7Celement:labels.text.fill%7Ccolor:0x64779e&style=feature:administrative.locality%7Cweight:8&style=feature:administrative.province%7Cvisibility:off&style=feature:administrative.province%7Celement:geometry.stroke%7Ccolor:0x4b6878&style=feature:landscape%7Ccolor:0xf50530%7Cweight:8&style=feature:landscape.man_made%7Celement:geometry.stroke%7Ccolor:0x334e87&style=feature:landscape.natural%7Celement:geometry%7Ccolor:0x023e58&style=feature:poi%7Cvisibility:off&style=feature:poi%7Celement:geometry%7Ccolor:0x283d6a&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x6f9ba5&style=feature:poi%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:poi.government%7Ccolor:0xffeb3b&style=feature:poi.park%7Celement:geometry.fill%7Ccolor:0x023e58&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x3C7680&style=feature:road%7Celement:geometry%7Ccolor:0x304a7d&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:road%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:road.highway%7Ccolor:0xf94262&style=feature:road.highway%7Celement:geometry%7Ccolor:0x2c6675&style=feature:road.highway%7Celement:geometry.stroke%7Ccolor:0x255763&style=feature:road.highway%7Celement:labels.text.fill%7Ccolor:0xb0d5ce&style=feature:road.highway%7Celement:labels.text.stroke%7Ccolor:0x023e58&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:transit%7Ccolor:0x48f2dd&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x98a5be&style=feature:transit%7Celement:labels.text.stroke%7Ccolor:0x1d2c4d&style=feature:transit.line%7Celement:geometry.fill%7Ccolor:0x283d6a&style=feature:transit.station%7Celement:geometry%7Ccolor:0x3a4762&style=feature:water%7Ccolor:0xfe3d63%7Cvisibility:off&style=feature:water%7Celement:geometry%7Ccolor:0x0e1626&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x4e6d70&size=480x360 ", (res, err) => {
//     console.log(res)
//     console.log(err)
// })

const options = {
  hostname: '127.0.0.1',
  port: 8888,
  path: '/',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()

if (process.env.NODE_ENV !== "development") {

    // The request handler must be the first middleware on the app
    // app.use(Sentry.Handlers.requestHandler());
    // // The error handler must be before any other error middleware and after all controllers
    // app.use(Sentry.Handlers.errorHandler());
    // Optional fallthrough error handler
    // app.use(function onError(err, req, res, next) {
    //     // The error id is attached to `res.sentry` to be returned
    //     // and optionally displayed to the user for support.
    //     res.statusCode = 500;
    //     res.end(res.sentry + "\n");
    // });

    // GET HTTPS WORKING
    // const options = {
    //     cert: fs.readFileSync('/var/www/https-certificates/fullchain.pem'),
    //     key: fs.readFileSync('/var/www/https-certificates/privkey.pem'),
    //     host: process.env.API_URL + ":" + appPort
    // };

    // server = https
    //     .createServer(options, app)
    //     .listen(appPort, () => console.log(`listening on port ${appPort}`))

    // const getOptions = {
    //     cert: fs.readFileSync('/var/www/https-certificates/fullchain.pem'),
    //     key: fs.readFileSync('/var/www/https-certificates/privkey.pem'),
    //     host: process.env.API_URL + ":" + appPort,
    //     port: appPort,
    //     path: '*',
    //     method: 'GET'
    // }


    // https.request(getOptions, (req, res) => {
    //     res.redirect(process.env.API_URL + ":" + appPort, + req.url);
    // })


    //SWAGGER DOCS
    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

} else {


    // server = app.listen(appPort, () => {
    //     console.log(`server running on port ${appPort}`)
    // });


    //SWAGGER DOCS
    // app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

}


let server = https.createServer(app).listen(appPort)


module.exports = server;

