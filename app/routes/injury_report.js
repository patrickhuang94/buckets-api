const express = require('express')
const router = express.Router()
const InjuryReportController = require('../controllers/injury_report')

router.get('/', async (req, res) => {
  try {
    if (!req.query.team) {
      const reports = await InjuryReportController.findAll()
      return res.send(reports)
    }

    const reports = await InjuryReportController.find({
      team: req.query.team,
    })
    return res.send(reports)
  } catch (err) {
    return res.send(err.message, 400)
  }
})

module.exports = router
