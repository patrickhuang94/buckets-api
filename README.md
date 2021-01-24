# nba-buckets

NBA Node API powered by basketball-reference. Contains 2019-2020 players and active 2020-2021 players.

## Player

#### Fetch all players

`/GET https://nba-buckets.herokuapp.com/api/v1/player`

#### Fetch player

`/GET https://nba-buckets.herokuapp.com/api/v1/player?name=<player_name>`

## Season average

#### Fetch season stats for player

`/GET https://nba-buckets.herokuapp.com/api/v1/season_average?name=<player_name>`

## Injury report

#### Fetch all injuries

`/GET https://nba-buckets.herokuapp.com/api/v1/injury_report`

#### Fetch injuries for a team

`/GET https://nba-buckets.herokuapp.com/api/v1/injury_report?team=<team_name>`

## Schedule

#### Fetch all scheduled games

`/GET https://nba-buckets.herokuapp.com/api/v1/schedule`

#### Fetch scheduled games for the month

`/GET https://nba-buckets.herokuapp.com/api/v1/schedule?month=<month>`
