module.exports = {
  development: {
    username: 'root',
    password: null,
    database: 'buckets_development',
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'mysql',
  },
}
