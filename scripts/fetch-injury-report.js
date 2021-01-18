const axios = require('axios')
const cheerio = require('cheerio')

async function fetchInjuryReport() {
  const url = `https://www.basketball-reference.com/friv/injuries.fcgi`
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  const injuryReport = []

  $('#injuries')
    .find('tbody')
    .each((_, element) => {
      $(element)
        .find('tr')
        .each((_, ele) => {
          const playerName = $(ele).find('th[data-stat="player"]').text()
          const date = $(ele).find('td[data-stat="date_update"]').text()
          const description = $(ele).find('td[data-stat="note"]').text()
          injuryReport.push({
            name: playerName,
            date,
            description,
          })
        })
    })

  return injuryReport
}

module.exports = fetchInjuryReport
