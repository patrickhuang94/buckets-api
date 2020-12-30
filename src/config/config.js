require('dotenv').config()

module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'buckets_development',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  },
}
