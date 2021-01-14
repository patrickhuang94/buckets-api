const Player = require('../app/models/player')
const PlayerController = require('../app/controllers/player')
const SeasonAverageController = require('../app/controllers/season_average')
const TeamController = require('../app/controllers/team')
const TeamRosterController = require('../app/controllers/team_roster')
const fetchPlayersUrls = require('./fetch-players-urls')
const fetchPlayerStats = require('./fetch-player-stats')
const fetchRoster = require('./fetch-roster')

async function players() {
  const allPlayerUrls = {}
  const playerUrls2021 = await fetchPlayersUrls({
    season: 2021,
    isRetry: false,
  })

  for (const [key, value] of Object.entries(playerUrls2021)) {
    if (!allPlayerUrls[key]) {
      allPlayerUrls[key] = value
    }
  }

  const playerUrls2020 = await fetchPlayersUrls({
    season: 2020,
    isRetry: false,
  })

  for (const [key, value] of Object.entries(playerUrls2020)) {
    if (!allPlayerUrls[key]) {
      allPlayerUrls[key] = value
    }
  }

  for (const player of Object.values(allPlayerUrls)) {
    let foundPlayer = await Player.findOne({ where: { name: player.name } })
    const fetchedPlayer = await fetchPlayerStats(player)

    if (!Object.keys(fetchedPlayer).length) {
      console.error('Uh oh. The player page is probably down.')
      continue
    }

    if (foundPlayer) {
      console.log(`${foundPlayer.name} already exists`)
    } else {
      console.log(`Creating player data for ${player.name}`)

      foundPlayer = await PlayerController.create({
        name: player.name,
        age: fetchedPlayer[player.name].age,
        position: fetchedPlayer[player.name].position,
        image_url: fetchedPlayer[player.name].image_url,
        team: fetchedPlayer[player.name].current_team,
      })
    }

    const existingStats = await SeasonAverageController.findByPlayerId({
      player_id: foundPlayer.id,
    })

    if (existingStats.length) {
      console.log('Updating player stats...')

      // Only update the current season's stats
      const stats = fetchedPlayer[player.name].stats
      const currentSeasonAverage = stats[stats.length - 1]
      await SeasonAverageController.update({
        player_id: foundPlayer.id,
        stats: currentSeasonAverage,
      })
    } else {
      console.log('Creating player stats...')

      await SeasonAverageController.create({
        player_id: foundPlayer.id,
        stats: fetchedPlayer[player.name].stats,
      })
    }
  }
}

async function roster() {
  const allTeams = await TeamController.findAll()

  for (const team of allTeams) {
    const teamAbbreviation = team.abbreviated_name
    const rosteredPlayers = await fetchRoster({
      team: teamAbbreviation,
      season: 2021,
    })
    const { win, loss, coach, players } = rosteredPlayers[teamAbbreviation]
    for (const player of players) {
      await TeamRosterController.create({
        season: '2020-21',
        team_abbreviation: teamAbbreviation,
        player,
        coach,
        win,
        loss,
      })
    }
  }
}

async function main() {
  console.log('Starting to scrape...')

  await players()
  await roster()

  console.log('Done!')
}

main()
