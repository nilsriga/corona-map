import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
import Parser from "rss-parser"
import auth from "./auth"
import createHash from "object-hash"
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



export default async function latestDataSaver(type) {

    setInterval(async () => {


        var infectedGoogleSheetsJson = await getGoogleSheetsJson("infected")
        const infectedPeopleHash = createHash(await infectedGoogleSheetsJson)
    
        fs.writeFileSync("./parsedData/infectedPeople.json", JSON.stringify({data: JSON.parse(await infectedGoogleSheetsJson), hash: infectedPeopleHash}))
    
        const factsGoogleSheetsJson = await getGoogleSheetsJson("facts")
        const factsHash = createHash(await factsGoogleSheetsJson)
        
        fs.writeFileSync("./parsedData/facts.json", JSON.stringify({ data: JSON.parse(await factsGoogleSheetsJson), hash: factsHash }))
    
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
            const tvnetRssHash = createHash(tvnetRss)
            fs.writeFileSync("./parsedData/tvnetRss.json", JSON.stringify({data: tvnetRss, hash: tvnetRssHash}))
        });



    }, 300000)

   

}