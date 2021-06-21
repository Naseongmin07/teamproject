const express = require('express')
const router = express.Router()
const userController = require('./userController.js')


router.get('/login',userController.login)
router.post('/join/success',userController.join_success)
router.get('/join',userController.join)


module.exports = router
