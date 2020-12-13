const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Team = db.define(
  'Team',
  {
    name: DataTypes.STRING,
    abbreviated_name: DataTypes.STRING,
    alternate_name: DataTypes.STRING,
    alternate_abbreviated_name: DataTypes.STRING,
    image_url: DataTypes.STRING,
    division: DataTypes.STRING,
  },
  {
    timestamps: true,
    underscored: true,
  }
)

module.exports = Team
