import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
import Parser from "rss-parser"
import _ from "lodash"
var ASQ = require("asynquence")

let parser = new Parser();

let keywords = [
    /korona/gi,
    /virus/gi,
    /viruss/gi,
    /corona/gi,
    /covid/gi,
    /19/gi,
    /atklāts/gi,
    /konstatēts/gi,
    /konstatets/gi,
    /izplatība/gi,
    /petijums/gi,
    /pētijums/gi,
    /covid-19/gi,
    /koronavīrusa/gi,
    /gadijums/gi,
    /covid/gi,
    /korona/gi
]


export default (express) => {


    express.get("/", async(req, res) => {
        var googleSheetsJson = await getGoogleSheetsJson()
            // console.log(googleSheetsJson.data)
        fs.appendFile('.counter', "1 " + new Date().toUTCString() + "\n", (err) => {
            if (err) {
                throw new Error("Corona error at api / path.")
            };
            console.log("1 " + new Date().toUTCString() + "\n");
        });
        res.send(await googleSheetsJson.toString())
    });



    //https://www.tvnet.lv/rss
    express.get("/tvnet", async(req, res) => {

        let tvnetRss = []

        ASQ()
            .then(async(done, msg) => {


                let getRss = async() => {

                    let feed = await parser.parseURL('https://www.tvnet.lv/rss');
                    console.log(feed)
                    res.send(feed);
                    let a = _.filter(feed, () => {

                    })

                    return tvnetRss
                }

                done(await getRss())


            })
            .then((done, rss) => {
                // res.send(JSON.stringify(tvnetRss))
            });


    });



};