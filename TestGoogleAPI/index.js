const express = require('express')
const app = express()
const port = 8080

const {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
} = require('./googleSheetService.js');

const LoginRoute = require('./routes/login.route');

require('dotenv').config()
const cors = require('cors');

const spreadsheetId = process.argv[2];
const sheetName = process.argv[3];
let data = {};

async function testGetSpreadSheet() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheet({
      spreadsheetId,
      auth
    })
    console.log('output for getSpreadSheet', JSON.stringify(response.data, null, 2));
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

async function testGetSpreadSheetValues() {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    })
    console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

app.get('/', (req, res) => {
  res.send('Welcome broooo!!');
  testGetSpreadSheet();
  testGetSpreadSheetValues();
})

app.use(express.json())

// allow sharing info between backend and frontend
app.use(cors());

app.use('/auth', LoginRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})