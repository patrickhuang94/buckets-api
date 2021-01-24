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
const injuryReport = require('./routes/injury_report')
const schedule = require('./routes/schedule')

app.use(bodyParser.json())
app.use(cookieParser())
app.use(helmet())

app.use(express.static('public'))
app.use('/api/v1/player', player)
app.use('/api/v1/team', team)
app.use('/api/v1/season_average', seaasonAverage)
app.use('/api/v1/team_roster', teamRoster)
app.use('/api/v1/injury_report', injuryReport)
app.use('/api/v1/schedule', schedule)

db.sync().then(() => {
  http.createServer(app).listen(port, () => {
    console.log('Express server listening on port ' + port)
  })
})

module.exports = app
