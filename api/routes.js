import getGoogleSheetsJson from "./SheetsController.js"
import fs from "fs"
export default (express) => {
  express.get("/", async (req, res) => {
    var googleSheetsJson = await getGoogleSheetsJson()
    // console.log(googleSheetsJson.data)
    fs.appendFile('request.counter', "1 \n", (err) => {
      if (err) {
        console.log(err)
      };
      console.log(1);
    });
    res.send(await googleSheetsJson.toString())
  });
};
