import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
export default (express) => {
  express.get("/", async (req, res) => {
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
  express.get("/infected", async (req, res) => {
    var googleSheetsJson = await getGoogleSheetsJson()
    var lastID = JSON.parse(googleSheetsJson).slice(JSON.parse(googleSheetsJson).length-4);

 


    // console.log(lastID)

    // console.log(googleSheetsJson.data)
    // fs.appendFile('.counter', "1 " + new Date().toUTCString() + "\n", (err) => {
    //   if (err) {
    //     throw new Error("Corona error at api / path.")
    //   };
    //   console.log("1 " + new Date().toUTCString() + "\n");
    // });
    res.send(await JSON.stringify(lastID))
  });
};
