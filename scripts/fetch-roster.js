const axios = require('axios')
const cheerio = require('cheerio')

async function fetchRoster({ team, season }) {
  const url = `https://www.basketball-reference.com/teams/${team}/${season}.html`
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  const roster = {}

  $('div')
    .find('[data-template="Partials/Teams/Summary"]')
    .each((_, element) => {
      const rawRecord = $(element)
        .clone()
        .find('p strong')
        .eq(3)
        .parent()
        .text()
      const leftParenIndex = rawRecord.indexOf('(')
      const rightParenIndex = rawRecord.indexOf(')')
      const record = rawRecord.substr(leftParenIndex, rightParenIndex)
      const recordWithoutParens = record.replace(/[()]/g, '')

      const coach = $(element).find('p strong').eq(3).siblings().text()
      const win = recordWithoutParens.split('-')[0]
      const loss = recordWithoutParens.split('-')[1]

      roster[team] = {
        win: parseInt(win),
        loss: parseInt(loss),
        coach,
      }
    })

  $('#div_roster')
    .find('tbody')
    .each((_, element) => {
      const players = []
      $(element)
        .find('tr')
        .each((_, ele) => {
          const playerNumber = $(ele).find('th[data-stat="number"]').text()
          // Player is technically on the roster but the db doesn't have
          // information because he hasn't played a game yet
          if (!playerNumber) return

          let name = $(ele).find('td[data-stat="player"]').text()
          if (name.includes('TW')) {
            name = name.split('(')[0].trim()
          }

          players.push(name)
        })

      roster[team] = {
        ...roster[team],
        players,
      }
    })

  return roster
}

module.exports = fetchRoster
