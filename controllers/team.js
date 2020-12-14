const Team = require('../models/team')

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
  findAll,
}
