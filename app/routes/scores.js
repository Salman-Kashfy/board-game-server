const express = require("express")
const router = express.Router()
const ScoreController = require('../controllers/ScoreController')
router.get('/scores', ScoreController.index)
router.post('/scores', ScoreController.store)

module.exports = router