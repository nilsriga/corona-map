import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
export default (express) => {
  express.get("/", async (req, res) => {
    var googleSheetsJson = await getGoogleSheetsJson()
    // console.log(googleSheetsJson.data)
    
    res.send(await googleSheetsJson.toString())
  });
};
