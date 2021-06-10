const express = require('express')
const router = express.Router()
const jobController = require('./jobController.js')


router.get('/interview',jobController.interview)
router.get('/portfolio',jobController.portfolio)
router.get('/recruit',jobController.recruit)




module.exports = router