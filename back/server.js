"use strict"
// Dependancies
import Express from "express"
import http from "http"
import https from "https"
import cors from "cors"
const dotenv = require('dotenv').config();



// ENV
const port = process.env.PORT || 8080
const host = process.env.HOST || "localhost"
const env = process.env.ENV || "development"


// Components 
import routes from "./routes.js"


// Primary https express
const express = Express()
const router = Express.Router()

express.set("env", env)
express.set("port", port)
express.use(cors())
express.use("/", router)
routes(express)





if (env == "production") {




  const certOpts = {
    key: "../certificates/key.pem",
    cert: "../certificates/cert.pem"
  }

  const server = https.createServer(certOpts, express)
  server.listen(port, () => {
    console.log("express server listening to port " + port)
  })

  // Secondary http express
  const httpexpress = express()
  const httpRouter = express.Router()
  httpexpress.use("*", httpRouter)
  httpRouter.get("*", (req, res) => {
    const host = req.get("Host")
    // replace the port in the host
    host = host.replace(/:\d+$/, ":" + express.get("port"))
    // determine the redirect destination
    const destination = ["https://", host, req.url].join("")
    return res.redirect(destination)
  })
  const httpServer = http.createServer(httpexpress)
  httpServer.listen(80)




} else {




  const server = http.createServer(express)
  server.listen(port, () => {
    console.log("express server listening to port ", "http://" + host + ":" + port)
  })




}


module.exports = express