import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
import Parser from "rss-parser"
import auth from "./auth"
import createHash from "object-hash"
import moment from "moment"
import "moment/locale/lv"
moment.locale('lv')
const ASQ = require("asynquence")

const parser = new Parser();

const keywords = [
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



function getLastUpdateTime(timeNow, type, data, oldData) {
    const newDataHash = createHash(data)
    const oldDataHash = oldData.hash
    const somethingNew = oldDataHash === newDataHash ? false : true

    const newfactsLastUpdateTime = somethingNew === false ? oldData.lastUpdateTime : timeNow
    return { shouldUpdate: somethingNew, lastUpdateTime: newfactsLastUpdateTime, newHash: somethingNew ? newDataHash : oldDataHash }
}



export default async function latestDataSaver(type) {

    setInterval(async () => {

        const timeNow = moment().format('D.M.YY, hh:mm:ss')

        let oldInfectedPeopleJson = {}
        let oldTvnetRssJson = {}
        let oldFactsJson = {}

        ASQ()
            .then(async (done, msg) => {
                oldInfectedPeopleJson = JSON.parse(fs.readFileSync("./parsedData/infectedPeople.json", "utf8"))
                oldTvnetRssJson = JSON.parse(fs.readFileSync("./parsedData/tvnetRss.json", "utf8"))
                oldFactsJson = JSON.parse(fs.readFileSync("./parsedData/facts.json", "utf8"))

                done({oldInfectedPeopleJson, oldTvnetRssJson, oldFactsJson})
            })
            .then(async (done, msg) => {


                // this updates infectedPeople.json
                const newInfectedGoogleSheetsJson = await getGoogleSheetsJson("infected")
                const infectedPartial = getLastUpdateTime(timeNow, "infectedPeople", await newInfectedGoogleSheetsJson, oldInfectedPeopleJson)
                const newInfectedPeopleLastUpdateTime = infectedPartial.lastUpdateTime
                if (infectedPartial.shouldUpdate) {
                    fs.writeFileSync("./parsedData/infectedPeople.json", JSON.stringify({ data: JSON.parse(await newInfectedGoogleSheetsJson), lastUpdateTime: newInfectedPeopleLastUpdateTime, hash: infectedPartial.newHash }))
                }



                // this updates facts.json
                const newFactsGoogleSheetsJson = await getGoogleSheetsJson("facts")
                const factsPartial = getLastUpdateTime(timeNow, "facts", await newFactsGoogleSheetsJson, oldFactsJson)
                const newfactsLastUpdateTime = factsPartial.lastUpdateTime
                console.log(infectedPartial.shouldUpdate)
                if (factsPartial.shouldUpdate) {
                    fs.writeFileSync("./parsedData/facts.json", JSON.stringify({ data: JSON.parse(await newFactsGoogleSheetsJson), lastUpdateTime: newfactsLastUpdateTime, hash: factsPartial.newHash }))
                }
                done()
            })




        // this parses tvnetRss
        ASQ()
            .then(async (done, msg) => {

            })
            .then(async (done, msg) => {

                let getRss = async () => {

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
                const tvnetRssPartial = getLastUpdateTime(timeNow, "tvnetRss", tvnetRss, oldTvnetRssJson)
                const newFactsLastUpdateTime = tvnetRssPartial.lastUpdateTime
                if (tvnetRssPartial.shouldUpdate) {
                    fs.writeFileSync("./parsedData/tvnetRss.json", JSON.stringify({ data: tvnetRss, lastUpdateTime: newFactsLastUpdateTime, hash: tvnetRssPartial.newHash }))
                }
            })



    }, 3000)



}