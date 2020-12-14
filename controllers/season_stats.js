const SeasonStats = require('../models/season_stats')
const Player = require('../models/player')

async function find({ name }) {
  const foundPlayer = await Player.findOne({
    where: { name },
  })

  if (!foundPlayer) {
    const error = `Stats for ${name} could not be found.`
    console.error(error)
    return error
  }

  const seasonStats = await SeasonStats.findAll({
    where: {
      player_id: foundPlayer.id,
    },
  })

  return seasonStats.map((stat) => ({
    season: stat.season,
    games_played: stat.games_played,
    games_started: stat.games_started,
    minutes_played: stat.minutes_played,
    field_goals: stat.field_goals,
    field_goal_attempts: stat.field_goal_attempts,
    field_goal_pct: stat.field_goal_pct,
    three_point_field_goals: stat.three_point_field_goals,
    three_point_field_goal_attempts: stat.three_point_field_goal_attempts,
    three_point_field_goal_pct: stat.three_point_field_goal_pct,
    two_point_field_goals: stat.two_point_field_goals,
    two_point_field_goal_attempts: stat.two_point_field_goal_attempts,
    two_point_field_goal_pct: stat.two_point_field_goal_pct,
    effective_field_goal_pct: stat.effective_field_goal_pct,
    free_throws: stat.free_throws,
    free_throw_attempts: stat.free_throw_attempts,
    free_throw_pct: stat.free_throw_pct,
    offensive_rebounds: stat.offensive_rebounds,
    defensive_rebounds: stat.defensive_rebounds,
    total_rebounds: stat.total_rebounds,
    assists: stat.assists,
    steals: stat.steals,
    blocks: stat.blocks,
    turnovers: stat.turnovers,
    fouls: stat.fouls,
    points: stat.points,
  }))
}

async function findByPlayerId({ player_id }) {
  const seasonStats = await SeasonStats.findAll({
    where: { player_id },
  })

  return seasonStats
}

async function create({ player_id, stats }) {
  if (!player_id) {
    console.error('Missing player ID!')
    return
  }

  if (!stats.length) {
    console.error('Missing stats!')
    return
  }

  const statsWithPlayerId = stats.map((stat) => ({
    ...stat,
    player_id,
  }))

  await SeasonStats.bulkCreate(statsWithPlayerId)
}

module.exports = {
  find,
  findByPlayerId,
  create,
}
