const express = require('express')
const app = express()
const router = express.Router()
const userController = require('./userController.js')

//user

router.post('/login/success',userController.login_success)
router.get('/login',userController.login)
router.get('/auth/kakao/callback',userController.login_kakao_callback)
router.get('/auth/kakao',userController.login_kakao)
router.post('/join/success',userController.join_success)
router.get('/join',userController.join)





module.exports = router