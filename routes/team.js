const express = require('express')
const router = express.Router()
const TeamController = require('../controllers/team')

router.get('/', async (req, res) => {
  const teams = await TeamController.findAll()
  return res.send(teams)
})

module.exports = router
