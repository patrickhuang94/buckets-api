require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { User } = require('./sequelize')

const app = express()
const port = 3001

app.listen(port, () => console.log(`Listening on port ${port}`))

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.json('Got here!')
})

app.get('/users', (req, res) => {
  User.findAll().then((users) => res.json(users))
})

module.exports = app
