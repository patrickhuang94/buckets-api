# nba-buckets

NBA Node API powered by basketball-reference. Contains 2019-2020 players and active 2020-2021 players.

## Player

#### Fetch all players

`/GET https://nba-buckets.herokuapp.com/player`

#### Fetch player

`/GET https://nba-buckets.herokuapp.com/player?name=<player_name>`

## Season stats

#### Fetch season stats for player

`/GET https://nba-buckets.herokuapp.com/season_stats?name=<player_name>`
