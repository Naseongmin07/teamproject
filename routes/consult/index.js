const express = require('express')
const router = express.Router()
const consultController = require('./consultController.js')


router.get('/apply',consultController.apply)
router.get('/consulting',consultController.consulting)
router.get('/faq',consultController.faq)



module.exports = router