const TeamController = require('../controllers/team')
const Schedule = require('../models/schedule')

async function create({ game_date, game_time, visitor, home }) {
  const visitorTeam = await TeamController.find({ name: visitor })
  const homeTeam = await TeamController.find({ name: home })

  if (!visitorTeam || !homeTeam) {
    throw new Error(
      `Visitor ${visitorTeam} or home ${homeTeam} cannot be found.`
    )
  }

  return await Schedule.create({
    game_date,
    game_time: `${game_time} ET`,
    visitor_team_id: visitorTeam.id,
    home_team_id: homeTeam.id,
  })
}

module.exports = {
  create,
}
