const express = require('express')
const router = express.Router()
const curriculumController = require('./curriculumController.js')


router.get('/curriculum',curriculumController.curriculum)



module.exports = router