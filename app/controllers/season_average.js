const { Op } = require('sequelize')
const SeasonAverage = require('../models/season_average')
const Player = require('../models/player')
const Team = require('../models/team')

async function find({ name, season }) {
  const foundPlayer = await Player.findOne({
    where: { name },
  })

  if (!foundPlayer) {
    const error = `Stats for ${name} could not be found.`
    console.error(error)
    return error
  }

  const params = season
    ? { where: { player_id: foundPlayer.id, season }, include: Team }
    : { where: { player_id: foundPlayer.id }, include: Team }

  const seasonAverage = await SeasonAverage.findAll(params)
  return seasonAverage.map((stat) => ({
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
    team: stat.team ? stat.team.name : null,
  }))
}

async function findByPlayerId({ player_id }) {
  const seasonAverage = await SeasonAverage.findAll({
    where: { player_id },
  })

  return seasonAverage
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

  const playerStats = []
  for (const stat of stats) {
    const team = await Team.findOne({
      where: {
        [Op.or]: [
          { abbreviated_name: stat.team },
          { alternate_abbreviated_name: stat.team },
        ],
      },
    })

    playerStats.push({
      ...stat,
      player_id,
      team_id: team ? team.id : null, // no teams available for 'TOT'
    })
  }

  await SeasonAverage.bulkCreate(playerStats)
}

async function update({ player_id, stats }) {
  const currentSeasonAverage = await SeasonAverage.findOne({
    where: {
      season: '2020-21',
      player_id,
    },
  })

  if (!currentSeasonAverage) {
    console.error('Player is not playing in current season')
    return
  }

  SeasonAverage.update(stats, {
    where: { id: currentSeasonAverage.id },
  })
}

module.exports = {
  find,
  findByPlayerId,
  create,
  update,
}
