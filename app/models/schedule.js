const { DataTypes } = require('sequelize')
const db = require('../../config/database')
const Team = require('./team')

const Schedule = db.define(
  'schedule',
  {
    game_time: DataTypes.STRING,
    game_date: DataTypes.DATEONLY,
    home_team_id: DataTypes.INTEGER,
    visitor_team_id: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    underscored: true,
  }
)

Schedule.belongsTo(Team, { name: 'home_team_id', field: 'team_id' })
Schedule.belongsTo(Team, { name: 'visitor_team_id', field: 'team_id' })

module.exports = Schedule
