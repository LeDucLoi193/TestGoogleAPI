const express = require('express')
const app = express()
const port = 8080

// Before run 'npm start', run
// export GOOGLE_APPLICATION_CREDENTIALS=./service_account_credentials.json
// export GCLOUD_PROJECT={composite-keel-294706}

const LoginRoute = require('./routes/login.route');

require('dotenv').config()
const cors = require('cors');


app.get('/', (req, res) => {
  res.send('Welcome broooo!!');
})

app.use(express.json())

// allow sharing info between backend and frontend
app.use(cors());

app.use('/auth', LoginRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})