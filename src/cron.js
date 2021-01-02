const cronJob = require('cron').CronJob
const scraper = require('./util/scraper')

module.exports = new cronJob('0 2 * * *', () => {
  console.log('Ding dong! Time to run scraper!')
  scraper()
})
