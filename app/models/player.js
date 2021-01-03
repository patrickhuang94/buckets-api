const { DataTypes } = require('sequelize')
const db = require('../../config/database')
const Team = require('./team')

const Player = db.define(
  'player',
  {
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    image_url: DataTypes.STRING,
    age: DataTypes.INTEGER,
    team_id: DataTypes.INTEGER,
  },
  {
    timestamps: true,
    underscored: true,
  }
)

Player.belongsTo(Team, { name: 'team_id', field: 'team_id' })
Team.hasMany(Player)

module.exports = Player
