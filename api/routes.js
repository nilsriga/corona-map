import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
import Parser from "rss-parser"
import auth from "./auth"
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


    express.get("/", auth, async(req, res) => {
        var googleSheetsJson = await getGoogleSheetsJson("infected")
            // console.log(googleSheetsJson.data)
        fs.appendFile('.counter', "1 " + new Date().toUTCString() + "\n" + req.headers["user-agent"] + "\n", (err) => {
            if (err) {
                throw new Error("Corona error at api / path.")
            };
            console.log("1 " + new Date().toUTCString() + "\n");
        });
        res.send(await googleSheetsJson.toString())
    });



    //https://www.tvnet.lv/rss
    express.get("/tvnet", auth, async(req, res) => {

        ASQ()
            .then(async(done, msg) => {


                let getRss = async() => {

                    let feed = await parser.parseURL('https://www.tvnet.lv/rss');


                    let filtered = feed.items.filter((el, i, arr) => {
                        let filteredTemp = keywords.map((el2, i, arr) => {
                            return el2.test(el.title)
                        })
                        return filteredTemp.includes(true) ? el : ""

                    })

                    return filtered

                }

                done(await getRss())


            })
            .then((done, tvnetRss) => {
                res.send(tvnetRss)
            });


    });


    express.get("/facts", auth, async(req, res) => {
        var googleSheetsJson = await getGoogleSheetsJson("facts")

        res.send(await googleSheetsJson.toString())
    });



};