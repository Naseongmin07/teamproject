const express = require('express')
const router = express.Router()
const userController = require('./userController.js')
const multer = require('multer')
const path = require('path')
const { Submain, Facility,Visitor } = require('../../models/index.js')
const { route } = require('../index.js')
const auth = require('../../middleware/auth.js')
const app = express()
const cookieParser = require('cookie-parser')
router.post('/visitor_info',userController.visitor_info)


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



router.post('/siteset',userController.siteset)

router.get('/image',(req,res)=>{
    res.render('makeimg.html')
})

router.post('/image',upload.single('img'),async (req,res)=>{
    if(req.body.name="enter"){
    let image = req.file.filename
    let {subboard,title,url,content} = req.body
    await Facility.create({
        image,url,subboard,title,text:content
    })
    res.redirect(`/admin/login_on?topmenu=시설소개&submenu=${subboard}`)
}else{
    console.log(req.body)
}
})
router.post('/image_del',userController.img_del)
router.post('/main_image_del',userController.main_img_del)
router.post('/hidden_main_img_del',userController.hidden_img_del)
router.post('/main_img',upload.single('imgg'),userController.main_img)

// /admin/login_on  
router.get('/',userController.admin_main)
router.post('/',userController.main_form)



router.post('/admin_menu/board_make',userController.board_make_post)
router.post('/admin_menu/board_manage',userController.board_manage_post)
router.post('/admin_list',userController.admin_list)

router.post('/user_list',userController.user_list)
router.post('user_list/location',userController.user_modify)
router.get('/community_write',userController.community_write)
router.post('/community_write',upload.single('com_img'),userController.community_write_post)

router.post('/community_del',userController.community_del)

router.get('/course')
router.get('/course_write',userController.course_write)
router.post('/course_write',upload.array('courseimg'),userController.course_write_post)
router.post('/course_form',userController.course_form)
router.get('/employ',userController.add_employee)
router.post('/employ/manage',userController.manage_employee)
router.post('/portfolio/manage',userController.manage_portfolio)

router.post('/employed',upload.array('employimg'),userController.employed)



router.post('/mainboard_group',userController.mainboard_group)
router.post('/board_group_modified',userController.board_group_modified)
module.exports = router