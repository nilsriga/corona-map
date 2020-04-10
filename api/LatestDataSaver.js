import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
import Parser from "rss-parser"
import auth from "./auth"
import createHash from "object-hash"
import oldInfectedPeopleJson from "./parsedData/infectedPeople.json"
import oldTvnetRssJson from "./parsedData/tvnetRss.json"
import oldFactsJson from "./parsedData/facts.json"
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

const timeNow = getLatvianFormatDate("now", "time")


function getLatvianFormatDate(when, time) {
    const whenSubtractor = when === "now" ? 0 : when === "yesterday" ? 864e5 : 0
    const dateArr = new Date(Date.now() - whenSubtractor).toLocaleString().split(',')[0].split("/")
    const firstNumber = dateArr.splice(0, 1)
    dateArr.splice(1, 0, firstNumber[0])
    const latvianFormatDateArr = dateArr.map(el => { return el.length < 2 ? 0 + el : el })
    const latvianFormatDateString = latvianFormatDateArr.join(".")
    if (!time) {
        return latvianFormatDateString
    } else {
        const hoursMinutes = []
        const timeArr = new Date(Date.now() - whenSubtractor).toLocaleString().split(',')[1].split(" ")[1].split(":")
        hoursMinutes.push(timeArr[0])
        hoursMinutes.push(timeArr[1])
        const latvianFormatTimeString = hoursMinutes.join(':')
        return latvianFormatDateString + ", " + latvianFormatTimeString
    }
}

function getLastUpdateTime(type, data) {
    const oldData = type === "infectedPeople" ? oldInfectedPeopleJson : type === "tvnetRss" ? oldTvnetRssJson : oldFactsJson
    const newDataHash = createHash(data)
    const oldDataHash = oldData.hash
    const somethingNew = oldDataHash === newDataHash ? false : true

    const newfactsLastUpdateTime = somethingNew === false ? oldData.lastUpdateTime : timeNow
    return { shouldUpdate: somethingNew, lastUpdateTime: newfactsLastUpdateTime, newHash: somethingNew ? newDataHash : oldDataHash }
}



export default async function latestDataSaver(type) {

    setInterval(async () => {


        // this updates infectedPeople.json
        const newInfectedGoogleSheetsJson = await getGoogleSheetsJson("infected")
        const infectedPartial = getLastUpdateTime("infectedPeople", newInfectedGoogleSheetsJson)
        const newInfectedPeopleLastUpdateTime = infectedPartial.lastUpdateTime

        if (infectedPartial.shouldUpdate) {
            fs.writeFileSync("./parsedData/infectedPeople.json", JSON.stringify({ data: JSON.parse(await newInfectedGoogleSheetsJson), lastUpdateTime: newInfectedPeopleLastUpdateTime, hash: infectedPartial.newHash }))
        }



        // this updates facts.json
        const newFactsGoogleSheetsJson = await getGoogleSheetsJson("facts")
        const factsPartial = getLastUpdateTime("facts", newFactsGoogleSheetsJson)
        const newfactsLastUpdateTime = factsPartial.lastUpdateTime

        if (factsPartial.shouldUpdate) {
            fs.writeFileSync("./parsedData/facts.json", JSON.stringify({ data: JSON.parse(await newFactsGoogleSheetsJson), lastUpdateTime: newfactsLastUpdateTime, hash: factsPartial.newHash }))
        }



        // this updates tvnetRss.json
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
                const tvnetRssPartial = getLastUpdateTime("tvnetRss", tvnetRss)
                const newFactsLastUpdateTime = tvnetRssPartial.lastUpdateTime
                if (tvnetRssPartial.shouldUpdate) {
                    fs.writeFileSync("./parsedData/tvnetRss.json", JSON.stringify({ data: tvnetRss, lastUpdateTime: newFactsLastUpdateTime, hash: tvnetRssPartial.newHash }))
                }
            })



    }, 3000)



}