const express = require('express')
const router = express.Router()
const TeamRosterController = require('../controllers/team_roster')

router.get('/', async (req, res) => {
  try {
    const teamRoster = await TeamRosterController.find({
      name: req.query.name,
    })

    return res.send(teamRoster)
  } catch (err) {
    return res.send(err.message, 400)
  }
})

module.exports = router
