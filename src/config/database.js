require('dotenv').config()
const { Sequelize } = require('sequelize')
const config = require('./config')

module.exports = new Sequelize(
  config[process.env.environment].database,
  config[process.env.environment].username,
  config[process.env.environment].password,
  {
    host: config[process.env.environment].host,
    dialect: 'mysql',
    define: { freezeTableName: true, underscored: true }, // prevent pluralizing table names
    logging: false,
  }
)
