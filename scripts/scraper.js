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
    await createOrUpdatePlayerStats(player)
  }
}

async function createOrUpdatePlayerStats(player) {
  const fetchedPlayer = await fetchPlayerStats(player)

  if (!Object.keys(fetchedPlayer).length) {
    console.error('Uh oh. The player page is probably down.')
    return
  }

  const foundPlayer = await PlayerController.findOrCreate({
    name: player.name,
    age: fetchedPlayer[player.name].age,
    position: fetchedPlayer[player.name].position,
    image_url: fetchedPlayer[player.name].image_url,
    team: fetchedPlayer[player.name].current_team,
  })

  console.log(`Creating or updating season average for ${foundPlayer.name}`)

  await SeasonAverageController.upsert({
    player_id: foundPlayer.id,
    stats: fetchedPlayer[player.name].stats,
  })
}

async function roster() {
  // since teams make trades and update team roster a lot, just
  // delete all records and recreate them
  console.log('Deleting team rosters...')
  await TeamRosterController.deleteAll()

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
