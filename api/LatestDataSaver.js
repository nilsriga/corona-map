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

function addHashToEach(jsonOrString, tvnetRss) {
    const json = typeof jsonOrString === "string" ? JSON.parse(jsonOrString) : jsonOrString
    if (!tvnetRss) {
        return json.map((el, i, arr) => {
            let concatenatedValues = ""
            for (let prop in el) {
                concatenatedValues = concatenatedValues.concat(el[prop])
            }
            const hash = createHash(concatenatedValues)
            el.hash = hash
            return el
        })
    } else {
        return json.map((el, i, arr) => {
            const hash = createHash(el.content)
            el.hash = hash
            return el
        })
    }
}

function getActiveCasesCount(newInfectedPeople) {
    let count = 0
    newInfectedPeople.forEach(person => {
        // console.log(person.isRecovered)
        // console.log(count)
        if (person.isRecovered === "0") {
            // console.log("person", person.isRecovered)
            count = count + 1
            // console.log(count)
        }
    })
    return count
}



export default async function latestDataSaver(type) {

    setInterval(async () => {

        const timeNow = moment().format('D.M.YY, HH:mm')

        let oldInfectedPeopleJson = {}
        let oldTvnetRssJson = {}
        let oldFactsJson = {}


        ASQ()
            .then(async (done, msg) => {
                oldInfectedPeopleJson = JSON.parse(fs.readFileSync("./parsedData/infectedPeople.json", "utf8"))
                oldTvnetRssJson = JSON.parse(fs.readFileSync("./parsedData/tvnetRss.json", "utf8"))
                oldFactsJson = JSON.parse(fs.readFileSync("./parsedData/facts.json", "utf8"))

                done()
            })
            .then(async (done, msg) => {


                // this updates infectedPeople.json
                const newInfectedGoogleSheetsJson = await getGoogleSheetsJson("infected")
                const infectedPartial = getLastUpdateTime(timeNow, "infectedPeople", newInfectedGoogleSheetsJson, oldInfectedPeopleJson)
                const newInfectedPeopleLastUpdateTime = infectedPartial.lastUpdateTime
                if (infectedPartial.shouldUpdate) {
                    const infectedWithHash = addHashToEach(newInfectedGoogleSheetsJson)
                    const metadata = {
                        howManyInfectedToday: 0,
                        whereTodayInfected: {},
                        activeCasesCount: getActiveCasesCount(infectedWithHash)
                    }
                    const placesWithInfectedToday = []

                    infectedWithHash.forEach(el => {
                        if (el.dateOfDiagnosisBroadcast === moment().format("DD.MM.YY")) {
                            // console.log(el.selfCity)
                            metadata.howManyInfectedToday++
                            placesWithInfectedToday.push(el.selfCity)
                        }
                    })

                    for (var i = 0; i < placesWithInfectedToday.length; i++) {
                        metadata.whereTodayInfected[placesWithInfectedToday[i]] = 1 + (metadata.whereTodayInfected[placesWithInfectedToday[i]] || 0);
                    }
                    // console.log(metadata)
                    fs.writeFileSync("./parsedData/infectedPeople.json", JSON.stringify({ data: infectedWithHash, lastUpdateTime: newInfectedPeopleLastUpdateTime, hash: infectedPartial.newHash, metadata: metadata }))
                }



                // this updates facts.json
                const newFactsGoogleSheetsJson = await getGoogleSheetsJson("facts")
                const factsPartial = getLastUpdateTime(timeNow, "facts", await newFactsGoogleSheetsJson, oldFactsJson)
                const newFactsLastUpdateTime = factsPartial.lastUpdateTime
                if (factsPartial.shouldUpdate) {
                    const factsWithHash = addHashToEach(newFactsGoogleSheetsJson)
                    fs.writeFileSync("./parsedData/facts.json", JSON.stringify({ data: factsWithHash, lastUpdateTime: newFactsLastUpdateTime, hash: factsPartial.newHash, metadata: {} }))
                }
                done()
            })




        // this parses tvnetRss
        ASQ()
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
                const newTvnetRssLastUpdateTime = tvnetRssPartial.lastUpdateTime
                if (tvnetRssPartial.shouldUpdate) {
                    const tvnetRssWithHash = addHashToEach(tvnetRss, "tvnetRss")
                    fs.writeFileSync("./parsedData/tvnetRss.json", JSON.stringify({ data: tvnetRssWithHash, lastUpdateTime: newTvnetRssLastUpdateTime, hash: tvnetRssPartial.newHash, metadata: {} }))
                }
            })



    }, 900)



}