const path = require('path')
const { Sequelize } = require('sequelize')
require('dotenv').config({ path: path.join(__dirname, '../.env') })

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
