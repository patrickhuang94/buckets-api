const { DataTypes } = require('sequelize')
const db = require('../../config/database')
const Player = require('./player')
const Team = require('./team')

const TeamRoster = db.define(
  'team_roster',
  {
    season: DataTypes.STRING,
    coach: DataTypes.STRING,
    win: DataTypes.INTEGER,
    loss: DataTypes.INTEGER,
    player_id: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    underscored: true,
  }
)

TeamRoster.belongsTo(Player, { name: 'player_id', field: 'player_id' })
TeamRoster.belongsTo(Team, { name: 'team_id', field: 'team_id' })

module.exports = TeamRoster
