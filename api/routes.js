import fs from "fs"
import auth from "./auth"


export default (express) => {


    express.post("/infected", auth, async (req, res) => {

        fs.appendFile('.counter', "1 " + new Date().toUTCString() + "\n" + req.headers["user-agent"] + "\n", (err) => {
            if (err) {
                throw new Error("Corona error at api / path, while appending counter")
            }

            console.log("1 " + new Date().toUTCString() + "\n");
        })



        fs.readFile("./parsedData/infectedPeople.json", (err, data) => {
            if (err) {
                throw new Error("Corona error reading file infectedPeople.json at api / path.")
            }

            const infectedPeopleJson = JSON.parse(data);

            if (infectedPeopleJson.hash === req.query.hash) {
                res.send(JSON.stringify("nothingNew"))
            } else {
                res.send(infectedPeopleJson)
            }

        })



    })



    //https://www.tvnet.lv/rss
    express.post("/tvnet", auth, async (req, res) => {


        fs.readFile("./parsedData/tvnetRss.json", (err, data) => {
            if (err) {
                throw new Error("Corona error reading file tvnetRss.json at api /tvnet path.")
            }

            const tvnetRssJson = JSON.parse(data);

            if (tvnetRssJson.hash === req.query.hash) {
                res.send(JSON.stringify("nothingNew"))
            } else {
                res.send(tvnetRssJson)
            }

        })

    })



    express.post("/facts", auth, async (req, res) => {


        fs.readFile("./parsedData/facts.json", (err, data) => {
            if (err) {
                throw new Error("Corona error reading file tvnetRss.json at api /tvnet path.")
            }

            const factsJson = JSON.parse(data);

            if (factsJson.hash === req.query.hash) {
                res.send(JSON.stringify("nothingNew"))
            } else {
                res.send(factsJson)
            }

        })


    })


}