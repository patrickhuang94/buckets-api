const { Sequelize } = require('sequelize')

module.exports = new Sequelize('buckets_development', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: { freezeTableName: true }, // prevent pluralizing table names
})
