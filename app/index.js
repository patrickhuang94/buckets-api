require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const http = require('http')
const db = require('../config/database')

db.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error: ${err}`))

const app = express()
const port = process.env.PORT || 3001

const player = require('./routes/player')
const team = require('./routes/team')
const seaasonAverage = require('./routes/season_average')
const teamRoster = require('./routes/team_roster')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet())

app.use('/player', player)
app.use('/team', team)
app.use('/season_average', seaasonAverage)
app.use('/team_roster', teamRoster)

db.sync().then(() => {
  http.createServer(app).listen(port, () => {
    console.log('Express server listening on port ' + port)
  })
})

module.exports = app
