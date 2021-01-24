const ScheduleController = require('../app/controllers/schedule')
const fetchSchedule = require('./fetch-schedule')
const { indexToMonth } = require('../util/months')

async function schedules({ month }) {
  const teamSchedules = await fetchSchedule({ month })

  for (const schedule of teamSchedules) {
    await ScheduleController.create({
      game_date: new Date(schedule.game_date).toISOString().slice(0, 10),
      game_time: schedule.game_time,
      visitor: schedule.visitor,
      home: schedule.home,
    })
  }
}

async function main() {
  const date = new Date()
  const currentDate = date.getDate()
  const currentMonth = date.getMonth()

  // Heroku Scheduler doesn't support monthly jobs. Only run
  // this on the first day of each month.
  if (currentDate === 1) {
    console.log('Starting to scrape...')

    await schedules({ month: indexToMonth[currentMonth] })

    console.log('Done!')
  }
}

main()
