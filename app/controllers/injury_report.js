const PlayerController = require('../controllers/player')
const InjuryReport = require('../models/injury_report')
const Player = require('../models/player')
const Team = require('../models/team')

async function findAll() {
  const reports = await InjuryReport.findAll({
    include: [{ model: Player }, { model: Team }],
  })

  return reports.map((report) => ({
    date_reported: report.date_reported,
    description: report.description,
    player: report.player.name,
    team: {
      short_name: report.team.abbreviated_name,
      full_name: report.team.name,
    },
  }))
}

async function find({ team }) {
  const reports = await InjuryReport.findAll({
    include: [{ model: Player }, { model: Team }],
  })

  return reports
    .filter((report) => report.team.abbreviated_name === team)
    .map((report) => ({
      date_reported: report.date_reported,
      description: report.description,
      player: report.player.name,
      team: {
        short_name: report.team.abbreviated_name,
        full_name: report.team.name,
      },
    }))
}

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
  find,
  findAll,
  deleteAll,
  create,
}
