const { Op } = require('sequelize')
const Team = require('../models/team')

async function find({ abbreviated_name, name }) {
  const team = await Team.findOne({
    where: {
      [Op.or]: [
        {
          abbreviated_name: {
            [Op.like]: `%${abbreviated_name}%`,
          },
        },
        {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      ],
    },
  })

  if (!team) {
    throw new Error(
      `Cannot find abbreviated team ${abbreviated_name} or team ${name}`
    )
  }

  return team
}

async function findAll() {
  const teams = await Team.findAll()

  const response = []
  for (const team of teams) {
    response.push({
      name: team.name,
      abbreviated_name: team.abbreviated_name,
      alternate_name: team.alternate_name ? team.alternate_name : undefined,
      alternate_abbreviated_name: team.alternate_abbreviated_name
        ? team.alternate_abbreviated_name
        : undefined,
      image_url: team.image_url,
      division: team.division,
    })
  }

  return response
}

module.exports = {
  find,
  findAll,
}
