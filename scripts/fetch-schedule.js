const axios = require('axios')
const cheerio = require('cheerio')

async function fetchSchedule({ month }) {
  const url = `https://www.basketball-reference.com/leagues/NBA_2021_games-${month}.html`
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  const schedule = []

  $('#div_schedule')
    .find('tbody')
    .each((_, element) => {
      $(element)
        .find('tr')
        .each((_, ele) => {
          const gameDate = $(ele).find('th[data-stat="date_game"] > a').text()
          const gameTime = $(ele).find('td[data-stat="game_start_time"]').text()
          const visitorTeam = $(ele)
            .find('td[data-stat="visitor_team_name"]')
            .text()
          const homeTeam = $(ele).find('td[data-stat="home_team_name"]').text()

          schedule.push({
            game_date: gameDate,
            game_time: gameTime,
            visitor: visitorTeam,
            home: homeTeam,
          })
        })
    })

  return schedule
}

module.exports = fetchSchedule
