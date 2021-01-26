const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/schedule')

router.get('/', async (req, res) => {
  try {
    let schedule
    if (req.query.month) {
      schedule = await ScheduleController.find({
        month: req.query.month,
      })
    } else if (req.query.team) {
      schedule = await ScheduleController.find({
        team: req.query.team,
      })
    } else {
      schedule = await ScheduleController.findAll()
    }

    return res.send(schedule)
  } catch (err) {
    return res.send(err.message, 400)
  }
})

module.exports = router
