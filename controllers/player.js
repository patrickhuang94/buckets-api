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
  })

  const response = []
  for (const player of players) {
    const team = await Team.findOne({
      where: { id: player.team_id },
    })

    response.push({
      name: player.name,
      position: player.position,
      image_url: player.image_url,
      age: player.age,
      team: team.name,
      team: {
        full_name: team.name,
        short_name: team.abbreviated_name,
      },
    })
  }

  return response
}

async function findAll() {
  const players = await Player.findAll()

  const response = []
  for (const player of players) {
    const team = await Team.findOne({
      where: { id: player.team_id },
    })

    response.push({
      name: player.name,
      position: player.position,
      image_url: player.image_url,
      age: player.age,
      team: {
        full_name: team.name,
        short_name: team.abbreviated_name,
      },
    })
  }

  return response
}

module.exports = {
  find,
  findAll,
}
