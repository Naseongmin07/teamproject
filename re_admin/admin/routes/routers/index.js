const express = require('express')
const router = express.Router()
const userController = require('./userController.js')
const multer = require('multer')
const path = require('path')
const { Submain, Facility } = require('../../models/index.js')
const { route } = require('../index.js')
const auth = require('../../middleware/auth.js')




const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads')
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf()+path.extname(file.originalname))
        }
    })
})
router.get('/image',(req,res)=>{
    res.render('makeimg.html')
})
router.post('/image',upload.single('img'),async (req,res)=>{
    if(req.body.name="enter"){
    let image = req.file.filename
    let url ="/admin/login_on/image"

    //let link = req.body.link
    await Facility.create({
        image,url
    })
    let result = await Facility.findAll({})
    //res.render('./makeimg.html',{result})
    res.redirect('/admin/login_on?topmenu=시설소개')
}else{
    console.log(req.body)
}
})
router.post('/image_del',userController.img_del)

// /admin/login_on
router.get('/',userController.admin_main)
router.post('/',userController.main_form)

router.post('/admin_menu/board_make',userController.board_make_post)
router.post('/admin_menu/board_manage',userController.board_manage_post)
router.post('/admin_list',userController.admin_list)

router.post('/user_list',userController.user_list)
router.get('/community_write',userController.community_write)
router.post('/community_write',userController.community_write_post)
// router.get('/category',userController.category_select)

router.get('/course_write',userController.course_write)
router.post('/course_write',userController.course_write_post)
router.post('/course_form',userController.course_form)
router.get('/employ',userController.add_employee)
router.get('/portfolio',userController.add_portfolio)
router.post('/employed_suc',userController.employed_suc)
router.post('/portfolio_sub',userController.portfolio_suc)

//==========================게시판그룹관리
router.get('/board_group',userController.board_group_get)

module.exports = router