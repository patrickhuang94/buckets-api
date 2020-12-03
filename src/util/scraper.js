const axios = require('axios')
const cheerio = require('cheerio')

// function parsePlayerImage($) {
//   const image = $('.media-item').find('img').attr('src')
//   return image
// }

async function fetchAllTeams() {
  const teams = {}

  const url = 'https://www.basketball-reference.com/teams/'
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  $('#teams_active')
    .find('tbody')
    .each((_, element) => {
      $(element)
        .find('.full_table')
        .each((_, ele) => {
          const teamName = $(ele).contents().eq(0).text()
          const seasonYearStart = $(ele).contents().eq(2).text()
          const seasonYearEnd = $(ele).contents().eq(3).text()
          const teamUrl = $(ele).contents().find('a').attr('href')

          teams[teamName] = {
            seasonYearStart,
            seasonYearEnd,
            url: `https://www.basketball-reference.com${teamUrl}`,
          }
        })
    })

  return teams
}

async function fetchPlayersUrls({ season }) {
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

  return playerUrls
}

async function fetchPlayerStats(player) {
  const playerStats = {}

  const url = `https://www.basketball-reference.com${player.url}`
  // const url = 'https://www.basketball-reference.com/players/o/oladivi01.html'
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  $('#per_game')
    .find('tbody')
    .each((_, element) => {
      $(element)
        .find('.full_table')
        .each((_, ele) => {
          const season = $(ele).find('th[data-stat="season"]').text()
          const team = $(ele).find('td[data-stat="team_id"]').text()
          const position = $(ele).find('td[data-stat="pos"]').text()
          const age = $(ele).find('td[data-stat="age"]').text()
          const games = $(ele).find('td[data-stat="g"]').text()
          const gamesStarted = $(ele).find('td[data-stat="gs"]').text()
          const minutes = $(ele).find('td[data-stat="mp_per_g"]').text()
          const fieldGoals = $(ele).find('td[data-stat="fg_per_g"]').text()
          const fieldGoalAttempts = $(ele)
            .find('td[data-stat="fga_per_g"]')
            .text()
          const fieldGoalPct = $(ele).find('td[data-stat="fg_pct"]').text()
          const threePointFieldGoals = $(ele)
            .find('td[data-stat="fg3_per_g"]')
            .text()
          const threePointFieldGoalAttempts = $(ele)
            .find('td[data-stat="fg3a_per_g"]')
            .text()
          const threePointFieldGoalPct = $(ele)
            .find('td[data-stat="fg3_pct"]')
            .text()
          const twoPointFieldGoals = $(ele)
            .find('td[data-stat="fg2_per_g"]')
            .text()
          const twoPointFieldGoalAttempts = $(ele)
            .find('td[data-stat="fg2a_per_g"]')
            .text()
          const twoPointFieldGoalPct = $(ele)
            .find('td[data-stat="fg2_pct"]')
            .text()
          const effectiveFieldGoalPct = $(ele)
            .find('td[data-stat="efg_pct"]')
            .text()
          const freeThrows = $(ele).find('td[data-stat="ft_per_g"]').text()
          const freeThrowAttempts = $(ele)
            .find('td[data-stat="fta_per_g"]')
            .text()
          const freeThrowPct = $(ele).find('td[data-stat="ft_pct"]').text()
          const offensiveRebounds = $(ele)
            .find('td[data-stat="orb_per_g"]')
            .text()
          const defensiveRebounds = $(ele)
            .find('td[data-stat="drb_per_g"]')
            .text()
          const totalRebounds = $(ele).find('td[data-stat="trb_per_g"]').text()
          const assists = $(ele).find('td[data-stat="ast_per_g"]').text()
          const steals = $(ele).find('td[data-stat="stl_per_g"]').text()
          const blocks = $(ele).find('td[data-stat="blk_per_g"]').text()
          const turnovers = $(ele).find('td[data-stat="tov_per_g"]').text()
          const fouls = $(ele).find('td[data-stat="pf_per_g"]').text()
          const points = $(ele).find('td[data-stat="pts_per_g"]').text()

          playerStats[player.name] = {
            ...playerStats[player.name],
            [season]: {
              team,
              position,
              age,
              games,
              gamesStarted,
              minutes,
              fieldGoals,
              fieldGoalAttempts,
              fieldGoalPct,
              threePointFieldGoals,
              threePointFieldGoalAttempts,
              threePointFieldGoalPct,
              twoPointFieldGoals,
              twoPointFieldGoalAttempts,
              twoPointFieldGoalPct,
              effectiveFieldGoalPct,
              freeThrows,
              freeThrowAttempts,
              freeThrowPct,
              offensiveRebounds,
              defensiveRebounds,
              totalRebounds,
              assists,
              steals,
              blocks,
              turnovers,
              fouls,
              points,
            },
          }
        })
    })

  return playerStats
}

async function main() {
  console.log('Starting to scrape...')
  let count = 0

  // const teams = await fetchAllTeams()

  // Object.values(teams).forEach((team) => {
  //   const url = team.url
  //   console.log('url: ', url)
  // })

  const playerUrls = await fetchPlayersUrls({
    season: 2020,
  })

  console.log(Object.values(playerUrls).length)

  await Promise.all(
    Object.values(playerUrls).map(async (player) => {
      const result = await fetchPlayerStats(player)
      count++
      console.log('count: ', count, player.name)
      return result
    })
  )

  // const result = await fetchPlayerStats({
  //   name: 'Victor Oladipo',
  //   url: '/players/o/oladivi01.html',
  // })
  // console.log({ result })

  console.log('Done!')
}

main()
