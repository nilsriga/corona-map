import axios from "axios"
import csv from "csv"
const dotenv = require('dotenv').config();

export default async function getGoogleSheetsJson(type) {

    var googleSheetsCsv

    if (type === "infected") {

        googleSheetsCsv = await axios.get(process.env.GOOGLE_SHEETS_URL)

    } else if (type == "facts") {

        googleSheetsCsv = await axios.get(process.env.GOOGLE_SHEETS_URL_FACTS)
    } else {

        googleSheetsCsv = await axios.get(process.env.GOOGLE_SHEETS_URL)

    }


    var _converting = new Promise((resolve, reject) => {
        csv.parse(googleSheetsCsv.data, { columns: true }, function(err, data) {
            resolve(JSON.stringify(type === "infected" ? data.reverse() : data, null, 2))
        });
    })

    var googleSheetsJson = await _converting

    return await googleSheetsJson

}