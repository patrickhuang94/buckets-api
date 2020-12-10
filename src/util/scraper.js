const axios = require('axios')
const cheerio = require('cheerio')
const Player = require('../../models/player')

const LATEST_SEASON = '2019-20'

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
  const player_stats = {}

  const url = `https://www.basketball-reference.com${player.url}`
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  const image_url = $('.media-item').find('img').attr('src')

  $('#per_game')
    .find('tbody')
    .each((_, element) => {
      const season_player_stats = []
      let primary_position
      let current_age
      $(element)
        .find('.full_table')
        .each((_, ele) => {
          const season = $(ele).find('th[data-stat="season"]').text()
          const position = $(ele).find('td[data-stat="pos"]').text()
          const age = $(ele).find('td[data-stat="age"]').text()
          const team = $(ele).find('td[data-stat="team_id"]').text()
          const games = $(ele).find('td[data-stat="g"]').text()
          const games_started = $(ele).find('td[data-stat="gs"]').text()
          const minutes = $(ele).find('td[data-stat="mp_per_g"]').text()
          const field_goals = $(ele).find('td[data-stat="fg_per_g"]').text()
          const field_goal_attempts = $(ele)
            .find('td[data-stat="fga_per_g"]')
            .text()
          const field_goal_pct = $(ele).find('td[data-stat="fg_pct"]').text()
          const three_point_field_goals = $(ele)
            .find('td[data-stat="fg3_per_g"]')
            .text()
          const three_point_field_goal_attempts = $(ele)
            .find('td[data-stat="fg3a_per_g"]')
            .text()
          const three_point_field_goal_pct = $(ele)
            .find('td[data-stat="fg3_pct"]')
            .text()
          const two_point_field_goals = $(ele)
            .find('td[data-stat="fg2_per_g"]')
            .text()
          const two_point_field_goal_attempts = $(ele)
            .find('td[data-stat="fg2a_per_g"]')
            .text()
          const two_point_field_goal_pct = $(ele)
            .find('td[data-stat="fg2_pct"]')
            .text()
          const effective_field_goal_pct = $(ele)
            .find('td[data-stat="efg_pct"]')
            .text()
          const free_throws = $(ele).find('td[data-stat="ft_per_g"]').text()
          const free_throw_attempts = $(ele)
            .find('td[data-stat="fta_per_g"]')
            .text()
          const free_throw_pct = $(ele).find('td[data-stat="ft_pct"]').text()
          const offensive_rebounds = $(ele)
            .find('td[data-stat="orb_per_g"]')
            .text()
          const defensive_rebounds = $(ele)
            .find('td[data-stat="drb_per_g"]')
            .text()
          const total_rebounds = $(ele).find('td[data-stat="trb_per_g"]').text()
          const assists = $(ele).find('td[data-stat="ast_per_g"]').text()
          const steals = $(ele).find('td[data-stat="stl_per_g"]').text()
          const blocks = $(ele).find('td[data-stat="blk_per_g"]').text()
          const turnovers = $(ele).find('td[data-stat="tov_per_g"]').text()
          const fouls = $(ele).find('td[data-stat="pf_per_g"]').text()
          const points = $(ele).find('td[data-stat="pts_per_g"]').text()

          season_player_stats.push({
            season,
            position,
            team,
            games,
            games_started,
            minutes,
            field_goals,
            field_goal_attempts,
            field_goal_pct,
            three_point_field_goals,
            three_point_field_goal_attempts,
            three_point_field_goal_pct,
            two_point_field_goals,
            two_point_field_goal_attempts,
            two_point_field_goal_pct,
            effective_field_goal_pct,
            free_throws,
            free_throw_attempts,
            free_throw_pct,
            offensive_rebounds,
            defensive_rebounds,
            total_rebounds,
            assists,
            steals,
            blocks,
            turnovers,
            fouls,
            points,
          })

          if (season === LATEST_SEASON) {
            primary_position = position
            current_age = age
          }
        })

      player_stats[player.name] = {
        age: current_age,
        position: primary_position,
        image_url,
        stats: season_player_stats,
      }
    })

  return player_stats
}

async function main() {
  console.log('Starting to scrape...')

  // const teams = await fetchAllTeams()

  // Object.values(teams).forEach((team) => {
  //   const url = team.url
  //   console.log('url: ', url)
  // })

  const playerUrls = await fetchPlayersUrls({
    season: 2020,
  })

  for (const player of Object.values(playerUrls)) {
    const foundPlayer = await Player.findAll({ where: { name: player.name } })
    if (foundPlayer.length) {
      console.log('Player already exists')
    } else {
      console.log(`Grabbing data for ${player.name}`)
      const fetchedPlayer = await fetchPlayerStats(player)
      console.log('Fetched data from basketball reference!')
      await Player.create({
        name: player.name,
        age: fetchedPlayer[player.name].age,
        position: fetchedPlayer[player.name].position,
        image_url: fetchedPlayer[player.name].image_url,
      })
    }
  }

  console.log('Done!')
}

main()
