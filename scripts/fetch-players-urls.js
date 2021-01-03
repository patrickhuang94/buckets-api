const axios = require('axios')
const cheerio = require('cheerio')
const SeasonStats = require('../app/models/season_stats')

async function fetchPlayersUrls({ season, isRetry }) {
  const playerUrls = {}

  const url = `https://www.basketball-reference.com/leagues/NBA_${season}_per_game.html`
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  $('#per_game_stats')
    .find('tbody')
    .each((_, element) => {
      $(element)
        .find('.full_table')
        .each((_, ele) => {
          const playerName = $(ele).find('td[data-stat="player"]').text()
          const playerUrl = $(ele)
            .find('td[data-stat="player"] > a')
            .attr('href')

          playerUrls[playerName] = {
            name: playerName,
            url: playerUrl,
          }
        })
    })

  if (isRetry) {
    // Network timeouts happen frequently. Use this to find the last player entry
    // and pick up where it left off.
    const lastEntry = await SeasonStats.findOne({
      order: [['id', 'DESC']],
    })
    const lastPlayer = await Player.findOne({
      where: { id: lastEntry.player_id },
    })

    const indexOfLastPlayer = Object.values(playerUrls)
      .map((player) => player.name)
      .indexOf(lastPlayer.name)

    const truncatedPlayerUrls = Object.values(playerUrls)
      .map((player) => player)
      .slice(indexOfLastPlayer + 1)

    return truncatedPlayerUrls
  }

  return playerUrls
}

module.exports = fetchPlayersUrls
