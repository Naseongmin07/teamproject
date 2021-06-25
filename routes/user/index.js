const express = require('express')
const router = express.Router()
const userController = require('./userController.js')


router.get('/login', userController.login)
router.post('/login/success', userController.login_success)
router.post('/useridcheck', userController.userid_check)
router.post('/join/success',userController.join_success)
router.get('/auth/kakao/callback',userController.login_kakao_callback)
router.get('/auth/kakao',userController.login_kakao)
router.get('/join',userController.join)


module.exports = router
