const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/player')

router.get('/', async (req, res) => {
  try {
    if (!req.query.name) {
      const players = await PlayerController.findAll()
      return res.send(players)
    }

    const players = await PlayerController.find({
      name: req.query.name,
    })

    return res.send(players)
  } catch (err) {
    return res.send(err.message, 400)
  }
})

module.exports = router
