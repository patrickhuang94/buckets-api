const express = require('express')
const router = express.Router()
const ScheduleController = require('../controllers/schedule')

router.get('/', async (req, res) => {
  try {
    if (!req.query.month) {
      const schedule = await ScheduleController.findAll()
      return res.send(schedule)
    }

    const schedule = await ScheduleController.find({
      month: req.query.month,
    })
    return res.send(schedule)
  } catch (err) {
    return res.send(err.message, 400)
  }
})

module.exports = router
