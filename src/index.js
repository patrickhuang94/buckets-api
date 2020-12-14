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
const team = require('../routes/team')
const seasonStats = require('../routes/season_stats')

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(bodyParser.json())
app.use(cookieParser())

app.use('/player', player)
app.use('/team', team)
app.use('/season_stats', seasonStats)

module.exports = app
