require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3001

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('Got here!')
})

module.exports = app
