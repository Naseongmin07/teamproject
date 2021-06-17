const express = require('express')
const router = express.Router()
const communityController = require('./communityController.js')


router.get('/notice',communityController.notice)
router.get('/load_notice',communityController.load_notice)
router.get('/professor',communityController.professor)
router.get('/reporter',communityController.reporter)
router.get('/review',communityController.review)
router.get('/review_notice',communityController.review_notice)
router.get('/story',communityController.story)



module.exports = router