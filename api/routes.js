import fs from "fs"
import auth from "./auth"
import infectedPeople from "./parsedData/infectedPeople.json"
import tvnetRss from "./parsedData/tvnetRss.json"
import facts from "./parsedData/facts.json"


export default (express) => {


    express.post("/infected", auth, async (req, res) => {

        fs.appendFile('.counter', "1 " + new Date().toUTCString() + "\n" + req.headers["user-agent"] + "\n", (err) => {
            if (err) {
                throw new Error("Corona error at api / path.")
            };
            console.log("1 " + new Date().toUTCString() + "\n");
        });

        if (fs.readFileSync("./parsedData/infectedPeople.json").hash === req.query.hash) {
            res.send(JSON.stringify("nothingNew"))
        } else {
            res.send(fs.readFileSync("./parsedData/infectedPeople.json"))
        }

    });


    //https://www.tvnet.lv/rss
    express.post("/tvnet", auth, async (req, res) => {

        if (tvnetRss.hash === req.query.hash) {
            res.send(JSON.stringify("nothingNew"))
        } else {
            res.send(tvnetRss)
        }

    });


    express.post("/facts", auth, async (req, res) => {

        if (facts.hash === req.query.hash) {
            res.send(JSON.stringify("nothingNew"))
        } else {
            res.send(facts)
        }
    });



};