const express = require('express')
const router = express.Router()
const userController = require('./userController.js')


// /admin/login_on
router.get('/',userController.admin_main)
router.post('/',userController.main_form)

router.post('/admin_menu/board_make',userController.board_make_post)
router.post('/admin_menu/board_manage',userController.board_manage_post)
router.post('/admin_list',userController.admin_list)

router.post('/user_list',userController.user_list)
module.exports = router