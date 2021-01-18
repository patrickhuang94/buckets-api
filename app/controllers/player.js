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

  if (!players.length) {
    console.log(`Cannot find players with name ${name}.`)
    return []
  }

  return players.map((player) => ({
    id: player.id,
    name: player.name,
    position: player.position,
    image_url: player.image_url,
    age: player.age,
    team: {
      id: player.team.id,
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

async function findOrCreate({ name, age, position, image_url, team }) {
  const foundTeam = await Team.findOne({
    where: { abbreviated_name: team },
  })

  const player = await Player.findOrCreate({
    where: { name },
    defaults: {
      age,
      position,
      image_url,
      team_id: foundTeam.id,
    },
    raw: true,
  })

  return player[0]
}

module.exports = {
  find,
  findAll,
  findOrCreate,
}
