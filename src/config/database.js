require('dotenv').config()
const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    define: { freezeTableName: true, underscored: true }, // prevent pluralizing table names
    logging: false,
  }
)
