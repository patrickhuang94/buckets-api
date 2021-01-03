const Team = require('../models/team')

async function seedTeams() {
  const teams = [
    {
      name: 'Atlanta Hawks',
      abbreviated_name: 'ATL',
      image_url: 'https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg',
      division: 'southeast',
    },
    {
      name: 'Boston Celtics',
      abbreviated_name: 'BOS',
      image_url: 'https://cdn.nba.com/logos/nba/1610612738/global/L/logo.svg',
      division: 'atlantic',
    },
    {
      name: 'Brooklyn Nets',
      abbreviated_name: 'BRK',
      alternate_name: 'New Jersey Nets',
      alternate_abbreviated_name: 'NJN',
      image_url: 'https://cdn.nba.com/logos/nba/1610612751/global/L/logo.svg',
      division: 'atlantic',
    },
    {
      name: 'Charlotte Hornets',
      abbreviated_name: 'CHO',
      alternate_name: 'Charlotte Bobcats',
      alternate_abbreviated_name: 'CHA',
      image_url: 'https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg',
      division: 'southeast',
    },
    {
      name: 'Chicago Bulls',
      abbreviated_name: 'CHI',
      image_url: 'https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg',
      division: 'central',
    },
    {
      name: 'Cleveland Cavaliers',
      abbreviated_name: 'CLE',
      image_url: 'https://cdn.nba.com/logos/nba/1610612739/global/L/logo.svg',
      division: 'central',
    },
    {
      name: 'Dallas Mavericks',
      abbreviated_name: 'DAL',
      image_url: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg',
      division: 'southwest',
    },
    {
      name: 'Denver Nuggets',
      abbreviated_name: 'DEN',
      image_url: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
      division: 'northwest',
    },
    {
      name: 'Detroit Pistons',
      abbreviated_name: 'DET',
      image_url: 'https://cdn.nba.com/logos/nba/1610612765/global/L/logo.svg',
      division: 'central',
    },
    {
      name: 'Golden State Warriors',
      abbreviated_name: 'GSW',
      image_url: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg',
      division: 'pacific',
    },
    {
      name: 'Houston Rockets',
      abbreviated_name: 'HOU',
      image_url: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg',
      division: 'southwest',
    },
    {
      name: 'Indiana Pacers',
      abbreviated_name: 'IND',
      image_url: 'https://cdn.nba.com/logos/nba/1610612754/global/L/logo.svg',
      division: 'central',
    },
    {
      name: 'Los Angeles Clippers',
      abbreviated_name: 'LAC',
      image_url: 'https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg',
      division: 'pacific',
    },
    {
      name: 'Los Angeles Lakers',
      abbreviated_name: 'LAL',
      image_url: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg',
      division: 'pacific',
    },
    {
      name: 'Memphis Grizzlies',
      abbreviated_name: 'MEM',
      alternate_name: 'Vancouver Grizzlies',
      alternate_abbreviated_name: 'VAN',
      image_url: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg',
      division: 'southwest',
    },
    {
      name: 'Miami Heat',
      abbreviated_name: 'MIA',
      image_url: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
      division: 'southeast',
    },
    {
      name: 'Milwaukee Bucks',
      abbreviated_name: 'MIL',
      image_url: 'https://cdn.nba.com/logos/nba/1610612749/global/L/logo.svg',
      division: 'central',
    },
    {
      name: 'Minnesota Timberwolves',
      abbreviated_name: 'MIN',
      image_url: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg',
      division: 'northwest',
    },
    {
      name: 'New Orleans Pelicans',
      abbreviated_name: 'NOP',
      alternate_name: 'New Orleans Hornets',
      alternate_abbreviated_name: 'NOH',
      image_url: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg',
      division: 'southwest',
    },
    {
      name: 'New York Knicks',
      abbreviated_name: 'NYK',
      image_url: 'https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg',
      division: 'atlantic',
    },
    {
      name: 'Oklahoma City Thunder',
      abbreviated_name: 'OKC',
      alternate_name: 'Seattle Supersonics',
      alternate_abbreviated_name: 'SEA',
      image_url: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg',
      division: 'northwest',
    },
    {
      name: 'Orlando Magic',
      abbreviated_name: 'ORL',
      image_url: 'https://cdn.nba.com/logos/nba/1610612753/global/L/logo.svg',
      division: 'southeast',
    },
    {
      name: 'Philadelphia 76ers',
      abbreviated_name: 'PHI',
      image_url: 'https://cdn.nba.com/logos/nba/1610612755/global/L/logo.svg',
      division: 'atlantic',
    },
    {
      name: 'Phoenix Suns',
      abbreviated_name: 'PHO',
      image_url: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg',
      division: 'pacific',
    },
    {
      name: 'Portland Trail Blazers',
      abbreviated_name: 'POR',
      image_url: 'https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg',
      division: 'northwest',
    },
    {
      name: 'Sacramento Kings',
      abbreviated_name: 'SAC',
      image_url: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg',
      division: 'pacific',
    },
    {
      name: 'San Antonio Spurs',
      abbreviated_name: 'SAS',
      image_url: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg',
      division: 'southwest',
    },
    {
      name: 'Toronto Raptors',
      abbreviated_name: 'TOR',
      image_url: 'https://cdn.nba.com/logos/nba/1610612761/global/L/logo.svg',
      division: 'atlantic',
    },
    {
      name: 'Utah Jazz',
      abbreviated_name: 'UTA',
      image_url: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg',
      division: 'northwest',
    },
    {
      name: 'Washington Wizards',
      abbreviated_name: 'WAS',
      image_url: 'https://cdn.nba.com/logos/nba/1610612764/global/L/logo.svg',
      division: 'southeast',
    },
  ]

  for (const team of teams) {
    await Team.create({
      name: team.name,
      abbreviated_name: team.abbreviated_name,
      alternate_name: team.alternate_name,
      alternate_abbreviated_name: team.alternate_abbreviated_name,
      image_url: team.image_url,
      division: team.division,
    })
  }
}

seedTeams()
