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
    id: player.id,
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

async function create({ name, age, position, image_url, team }) {
  if (!name) {
    console.error('Missing player name!')
    return
  }

  if (!age || !image_url || !team) {
    console.error(`Data missing for ${name}`)
    return
  }

  const foundTeam = await Team.findOne({
    where: { abbreviated_name: team },
  })

  return await Player.create({
    name: name,
    age: age || '',
    position: position || '',
    image_url: image_url || '',
    team_id: foundTeam.id,
  })
}

module.exports = {
  find,
  findAll,
  create,
}
