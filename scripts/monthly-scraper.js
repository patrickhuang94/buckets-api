const ScheduleController = require('../app/controllers/schedule')

const fetchSchedule = require('./fetch-schedule')

const months = {
  0: 'january',
  1: 'february',
  2: 'march',
  3: 'april',
  4: 'may',
  5: 'june',
  6: 'july',
  7: 'august',
  8: 'september',
  9: 'october',
  10: 'november',
  11: 'december',
}

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

    await schedules({ month: months[currentMonth] })

    console.log('Done!')
  }
}

main()
