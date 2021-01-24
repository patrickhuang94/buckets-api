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

Schedule.belongsTo(Team, {
  targetKey: 'id',
  foreignKey: 'home_team_id',
  as: 'home_team',
})
Schedule.belongsTo(Team, {
  targetKey: 'id',
  foreignKey: 'visitor_team_id',
  as: 'visitor_team',
})

module.exports = Schedule
