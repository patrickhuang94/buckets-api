const express = require('express')
const router = express.Router()
const PlayerController = require('../controllers/player')

router.get('/', async (req, res) => {
  if (!req.query.name) {
    const players = await PlayerController.findAll()
    return res.send(players)
  }

  const players = await PlayerController.find({
    name: req.query.name,
  })

  return res.send(players)
})

module.exports = router
