const {
  getAuthToken,
  getSpreadSheet,
  getSpreadSheetValues
} = require('../models/login.model');

const { GoogleSpreadsheet } = require('google-spreadsheet');

// spreadsheet key is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg');

const spreadsheetId = '1QaCm9HM0gnJUrEdJAiGKdMk168qSIg6iYosenuI2Sxg';
const sheetName = 'Sheet1';
let data = {};

// async function testGetSpreadSheet() {
//   try {
//     const auth = await getAuthToken();
//     const response = await getSpreadSheet({
//       spreadsheetId,
//       auth
//     })
//     console.log('output for getSpreadSheet', JSON.stringify(response.data, null, 2));
//   } catch(error) {
//     console.log(error.message, error.stack);
//   }
// }

const testGetSpreadSheetValues = async () => {
  try {
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      spreadsheetId,
      sheetName,
      auth
    })
    // console.log('output for getSpreadSheetValues', JSON.stringify(response.data, null, 2));
    return response;
  } catch(error) {
    console.log(error.message, error.stack);
  }
}

module.exports.login = async function (req, res) {
  try {
    const { username, password } = req.body;
    console.log(username, password)
    let flag = 0;
  
    data = await testGetSpreadSheetValues();
    for (const element of data.data.values) {
      if (username === element[1]) {
        if (password !== element[3]) {
          flag = 2;
        } 
        else {
          flag = 0;
        }
        break;
      } 
      else {
        flag = 1;
      }
    }
    if (flag === 1) {
      res.status(500).send({
        message: 'Username is not exist.'
      })
    }
    else if (flag === 2) {
        res.status(500).send({
        message: 'Wrong password.'
      })
    }
    else 
      res.status(200).json({
        message: 'Oke'
      })
    return;
  } catch(err) {
    console.log(err)
  }

  return;
}

module.exports.signUp = async function (req, res) {
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    
    await sheet.addRow({
      ...req.body
    })

    res.status(200).json({
      message: "Sign up successfully."
    })
  } catch(err) {
    console.log(err)
  } 
}