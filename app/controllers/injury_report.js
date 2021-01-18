const InjuryReport = require('../models/injury_report')
const PlayerController = require('../controllers/player')

async function deleteAll() {
  return await InjuryReport.destroy({
    where: {},
    truncate: true,
  })
}

async function create({ player_name, description, date }) {
  const foundPlayer = await PlayerController.find({ name: player_name })
  if (!foundPlayer.length) {
    console.log('This player probably is not important anyway. Skip!')
    return
  }

  return await InjuryReport.create({
    player_id: foundPlayer[0].id,
    team_id: foundPlayer[0].team.id,
    date,
    description,
  })
}

module.exports = {
  deleteAll,
  create,
}
