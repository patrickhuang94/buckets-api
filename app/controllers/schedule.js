const Sequelize = require('sequelize')
const { monthToIndex } = require('../../util/months')

const TeamController = require('../controllers/team')
const Schedule = require('../models/schedule')
const Team = require('../models/team')

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

async function find({ month }) {
  const schedule = await Schedule.findAll({
    where: Sequelize.where(
      Sequelize.fn('MONTH', Sequelize.col('game_date')),
      monthToIndex[month]
    ),
    include: [
      { model: Team, as: 'visitor_team' },
      { model: Team, as: 'home_team' },
    ],
  })

  return schedule.map((s) => ({
    game_time: s.game_time,
    game_date: s.game_date,
    home_team: {
      short_name: s.home_team.abbreviated_name,
      full_name: s.home_team.name,
    },
    visitor_team: {
      short_name: s.visitor_team.abbreviated_name,
      full_name: s.visitor_team.name,
    },
  }))
}

async function findAll() {
  const schedule = await Schedule.findAll({
    include: [
      { model: Team, as: 'visitor_team' },
      { model: Team, as: 'home_team' },
    ],
  })

  return schedule.map((s) => ({
    game_time: s.game_time,
    game_date: s.game_date,
    home_team: {
      short_name: s.home_team.abbreviated_name,
      full_name: s.home_team.name,
    },
    visitor_team: {
      short_name: s.visitor_team.abbreviated_name,
      full_name: s.visitor_team.name,
    },
  }))
}

module.exports = {
  create,
  find,
  findAll,
}
