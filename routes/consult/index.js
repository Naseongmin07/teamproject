const express = require('express')
const router = express.Router()
const consultController = require('./consultController.js')


router.get('/apply',consultController.apply)
router.get('/consulting',consultController.consulting)
router.post('/user/consulting', consultController.user_consulting)
router.post('/user/apply', consultController.user_apply)
router.get('/faq',consultController.faq)



module.exports = router