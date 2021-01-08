const Sequelize = require('sequelize')
const TeamRoster = require('../models/team_roster')
const PlayerController = require('../controllers/player')
const TeamController = require('../controllers/team')
const Team = require('../models/team')
const Player = require('../models/player')

async function find({ name }) {
  const foundTeam = await TeamController.find({ abbreviated_name: name })
  if (!foundTeam) {
    throw new Error(`Cannot find team name ${name}.`)
  }

  const teamRoster = await TeamRoster.findAll({
    include: [
      { model: Player },
      {
        model: Team,
        where: { abbreviated_name: name },
      },
    ],
  })

  return {
    coach: teamRoster[0].coach,
    win: teamRoster[0].win,
    loss: teamRoster[0].loss,
    players: teamRoster.map((tr) => tr.player.name),
  }
}

async function create({ season, team_abbreviation, player, coach, win, loss }) {
  if (!player) {
    console.error('Missing player name!')
    return
  }

  if (!season || !coach || !win || !loss) {
    console.error(`Data missing for ${player_name}`)
    return
  }

  const foundPlayer = await PlayerController.find({ name: player })
  const foundTeam = await TeamController.find({
    abbreviated_name: team_abbreviation,
  })
  const foundRosterPlayer = await TeamRoster.findOne({
    where: { player_id: foundPlayer[0].id },
  })

  if (foundRosterPlayer) {
    console.log(
      `${foundPlayer[0].name} is already listed on ${foundTeam.name}.`
    )
    return
  }

  console.log(`Creating ${foundPlayer[0].name} on ${foundTeam.name}...`)
  return await TeamRoster.create({
    player_id: foundPlayer[0].id,
    season,
    team_id: foundTeam.id,
    coach,
    win,
    loss,
  })
}

module.exports = {
  find,
  create,
}
