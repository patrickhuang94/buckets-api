# triple-double

NBA Node API powered by basketball-reference. Contains 2019-2020 players and active 2020-2021 players.

## Player

#### Fetch all players

`/GET https://tripledouble.herokuapp.com/api/v1/player`

#### Fetch player

`/GET https://tripledouble.herokuapp.com/api/v1/player?name=<player_name>`

## Season average

#### Fetch season stats for player

`/GET https://tripledouble.herokuapp.com/api/v1/season_average?name=<player_name>`

## Injury report

#### Fetch all injuries

`/GET https://tripledouble.herokuapp.com/api/v1/injury_report`

#### Fetch injuries for a team

`/GET https://tripledouble.herokuapp.com/api/v1/injury_report?team=<team_name>`

## Schedule

#### Fetch all scheduled games

`/GET https://tripledouble.herokuapp.com/api/v1/schedule`

#### Fetch scheduled games for the month

`/GET https://tripledouble.herokuapp.com/api/v1/schedule?month=<month>`
