const { Model, DataTypes } = require('sequelize')
const db = require('../config/database')

class Player extends Model {}

Player.init(
  {
    name: DataTypes.STRING,
    position: DataTypes.STRING,
    image_url: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    sequelize: db,
    modelName: 'Player',
  }
)

module.exports = Player
