require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('../config/database')

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`))

const app = express()
const port = 3001

const player = require('../routes/player')

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Got here!')
})

app.use('/player', player)

module.exports = app
