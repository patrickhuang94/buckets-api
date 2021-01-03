const axios = require('axios')
const cheerio = require('cheerio')

async function fetchPlayerStats(player) {
  const player_stats = {}

  const url = `https://www.basketball-reference.com${player.url}`
  const html = await axios.get(url)
  const $ = cheerio.load(html.data)

  const image_url = $('.media-item').find('img').attr('src')

  $('#all_per_game')
    .find('tbody')
    .each((_, element) => {
      const season_player_stats = []
      let primary_position
      let current_age
      let current_team

      $(element)
        .find('tr')
        .each((_, ele) => {
          const season = $(ele).find('th[data-stat="season"]').text()
          const position = $(ele).find('td[data-stat="pos"]').text()
          const age = $(ele).find('td[data-stat="age"]').text()
          const team = $(ele).find('td[data-stat="team_id"]').text()
          const games_played = $(ele).find('td[data-stat="g"]').text()
          const games_started = $(ele).find('td[data-stat="gs"]').text()
          const minutes_played = $(ele).find('td[data-stat="mp_per_g"]').text()
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

          // Some players "Did Not Play" during some seasons, and so
          // do not have an associated team
          if (team) {
            season_player_stats.push({
              season,
              position,
              team,
              games_played: parseInt(games_played) || 0,
              games_started: parseInt(games_started) || 0,
              minutes_played: parseFloat(minutes_played) || 0,
              field_goals: parseFloat(field_goals) || 0,
              field_goal_attempts: parseFloat(field_goal_attempts) || 0,
              field_goal_pct: parseFloat(field_goal_pct) || 0,
              three_point_field_goals: parseFloat(three_point_field_goals) || 0,
              three_point_field_goal_attempts:
                parseFloat(three_point_field_goal_attempts) || 0,
              three_point_field_goal_pct:
                parseFloat(three_point_field_goal_pct) || 0,
              two_point_field_goals: parseFloat(two_point_field_goals) || 0,
              two_point_field_goal_attempts:
                parseFloat(two_point_field_goal_attempts) || 0,
              two_point_field_goal_pct:
                parseFloat(two_point_field_goal_pct) || 0,
              effective_field_goal_pct:
                parseFloat(effective_field_goal_pct) || 0,
              free_throws: parseFloat(free_throws) || 0,
              free_throw_attempts: parseFloat(free_throw_attempts) || 0,
              free_throw_pct: parseFloat(free_throw_pct) || 0,
              offensive_rebounds: parseFloat(offensive_rebounds) || 0,
              defensive_rebounds: parseFloat(defensive_rebounds) || 0,
              total_rebounds: parseFloat(total_rebounds) || 0,
              assists: parseFloat(assists) || 0,
              steals: parseFloat(steals) || 0,
              blocks: parseFloat(blocks) || 0,
              turnovers: parseFloat(turnovers) || 0,
              fouls: parseFloat(fouls) || 0,
              points: parseFloat(points) || 0,
            })

            primary_position = position
            current_age = age
            current_team = team
          }
        })

      player_stats[player.name] = {
        age: current_age,
        position: primary_position,
        current_team,
        image_url,
        stats: season_player_stats,
      }
    })

  return player_stats
}

module.exports = fetchPlayerStats
