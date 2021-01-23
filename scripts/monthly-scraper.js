const ScheduleController = require('../app/controllers/schedule')

const fetchSchedule = require('./fetch-schedule')

async function schedules() {
  const teamSchedules = await fetchSchedule({ month: 'january' })

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
  console.log('Starting to scrape...')

  await schedules()

  console.log('Done!')
}

main()
