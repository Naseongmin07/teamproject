const express = require('express')
const router = express.Router()
const collegeController = require('./collegeController.js')


router.get('/history',collegeController.history)
router.get('/interior',collegeController.interior)
router.get('/introduction',collegeController.introduction)
router.get('/location',collegeController.location)
router.get('/teachers',collegeController.teachers)



module.exports = router