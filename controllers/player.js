const { Op } = require('sequelize')
const Player = require('../models/player')
const Team = require('../models/team')

async function find({ name }) {
  const players = await Player.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`,
      },
    },
    include: Team,
  })

  return players.map((player) => ({
    name: player.name,
    position: player.position,
    image_url: player.image_url,
    age: player.age,
    team: {
      full_name: player.team.name,
      short_name: player.team.abbreviated_name,
    },
  }))
}

async function findAll() {
  const players = await Player.findAll({ include: Team })

  return players.map((player) => ({
    name: player.name,
    position: player.position,
    image_url: player.image_url,
    age: player.age,
    team: {
      full_name: player.team.name,
      short_name: player.team.abbreviated_name,
    },
  }))
}

module.exports = {
  find,
  findAll,
}
