const TeamRoster = require('../models/team_roster')
const PlayerController = require('../controllers/player')
const TeamController = require('../controllers/team')

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
  create,
}
