const Sequelize = require('sequelize')
const UserModel = require('../models/user')

const sequelize = new Sequelize('development', 'username', {
  host: 'localhost',
  dialect: 'mysql',
})

const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`)
})

module.exports = {
  User,
}
