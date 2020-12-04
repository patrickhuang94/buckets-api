const { DataTypes } = require('sequelize')
const db = require('../config/database')

const Player = db.define('Player', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Player
