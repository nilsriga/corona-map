import getGoogleSheetsJson from "./SheetsController.js"

export default (express) => {
  express.get("/", async (req, res) => {
    var googleSheetsJson = await getGoogleSheetsJson()
    // console.log(googleSheetsJson.data)
    res.send(googleSheetsJson)
  });
};
