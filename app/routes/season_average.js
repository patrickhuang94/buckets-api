const express = require('express')
const router = express.Router()
const SeasonAverageController = require('../controllers/season_average')

router.get('/', async (req, res) => {
  const seasonAverage = await SeasonAverageController.find({
    name: req.query.name,
    season: req.query.season,
  })

  return res.send(seasonAverage)
})

module.exports = router
