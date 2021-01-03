const { DataTypes } = require('sequelize')
const db = require('../../config/database')
const Player = require('./player')
const Team = require('./team')

const SeasonAverage = db.define(
  'season_averaage',
  {
    season: DataTypes.STRING,
    games_played: DataTypes.INTEGER,
    games_started: DataTypes.INTEGER,
    minutes_played: DataTypes.FLOAT,
    field_goals: DataTypes.FLOAT,
    field_goal_attempts: DataTypes.FLOAT,
    field_goal_pct: DataTypes.FLOAT,
    three_point_field_goals: DataTypes.FLOAT,
    three_point_field_goal_attempts: DataTypes.FLOAT,
    three_point_field_goal_pct: DataTypes.FLOAT,
    two_point_field_goals: DataTypes.FLOAT,
    two_point_field_goal_attempts: DataTypes.FLOAT,
    two_point_field_goal_pct: DataTypes.FLOAT,
    effective_field_goal_pct: DataTypes.FLOAT,
    free_throws: DataTypes.FLOAT,
    free_throw_attempts: DataTypes.FLOAT,
    free_throw_pct: DataTypes.FLOAT,
    offensive_rebounds: DataTypes.FLOAT,
    defensive_rebounds: DataTypes.FLOAT,
    total_rebounds: DataTypes.FLOAT,
    assists: DataTypes.FLOAT,
    steals: DataTypes.FLOAT,
    blocks: DataTypes.FLOAT,
    turnovers: DataTypes.FLOAT,
    fouls: DataTypes.FLOAT,
    points: DataTypes.FLOAT,
    player_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    underscored: true,
  }
)

SeasonAverage.belongsTo(Player, { name: 'player_id', field: 'player_id' })
SeasonAverage.belongsTo(Team, { name: 'team_id', field: 'team_id' })
Player.hasMany(SeasonAverage)
Team.hasMany(SeasonAverage)

module.exports = SeasonAverage
