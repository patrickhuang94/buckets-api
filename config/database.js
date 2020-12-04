const { Sequelize } = require('sequelize')
module.exports = new Sequelize('buckets_development', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
})
