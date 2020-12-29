const express = require('express')
const router = express.Router()
const SeasonStatsController = require('../controllers/season_stats')

router.get('/', async (req, res) => {
  const seasonStats = await SeasonStatsController.find({
    name: req.query.name,
  })

  return res.send(seasonStats)
})

module.exports = router
