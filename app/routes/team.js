const express = require('express')
const router = express.Router()
const TeamController = require('../controllers/team')

router.get('/', async (req, res) => {
  try {
    if (!req.query.name) {
      const teams = await TeamController.findAll()
      return res.send(teams)
    }

    const team = await TeamController.find({
      abbreviated_name: req.query.name,
    })

    return res.send(team)
  } catch (err) {
    return res.send(err.message, 400)
  }
})

module.exports = router
