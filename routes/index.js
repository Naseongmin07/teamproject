const express = require('express')
const { route } = require('./user')
const path = require('path')
const multer = require('multer')
const router = express.Router()
const userRouter = require('./user/index.js')
const collegeRouter = require('./college/index.js')
const communityRouter = require('./community/index.js')
const consultRouter = require('./consult/index.js')
const curriculumRouter = require('./curriculum/index.js')
const jobRouter =require('./job/index.js')
const chatRouter = require('./chat/index.js')
const indexRouter = require('./routers/index.js')
const {Mainvisual, Community} = require('../models') 
// const searchRouter = require('./search/index.js')
const testRouter = require('./test/index.js')
const logoRouter = require('./logo/index.js')


router.use('/user',userRouter)
router.use('/college',collegeRouter)
router.use('/community',communityRouter)
router.use('/consult',consultRouter)
router.use('/curriculum',curriculumRouter)
router.use('/job',jobRouter)
router.use('/chat',chatRouter)
router.use('/test',testRouter)
router.use('/admin/login_on',indexRouter)
router.use('/logo',logoRouter)
router.use('/admin',(req,res)=>{
    console.log(req.sessionID)
    res.cookie('sessionID',req.sessionID,{httpOnly:true,secure:true,})
    res.render('./login.html')
})
// router.use('/search',searchRouter)

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads')
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf()+Path.extname(file.originalname))
        }
    })
})


router.get('/',async (req,res)=>{
    let banner = await Mainvisual.findAll({where:{
        watchaut:1
    }})
    let bottomImg = await Mainvisual.findAll({where:{
        watchaut:0
    }})
    let report = await Community.findAll({where:{subBoard:'공지사항'}})
    let classOpen = await Community.findAll({where:{subBoard:'개강일'}})
    console.log('http://localhost://',banner[0].image)
    res.cookie('sessionID',req.sessionID,{httpOnly:true,secure:true,})
    res.render('main.html',{banner,bottomImg,report,classOpen})
})
router.post('/',async (req,res)=>{
    let banner = await Mainvisual.findAll({where:{
        watchaut:1
    }})
    let bottomImg = await Mainvisual.findAll({where:{
        watchaut:0
    }})
    let report = await Community.findAll({where:{subBoard:'공지사항'}})
    let classOpen = await Community.findAll({where:{subBoard:'개강일'}})
    console.log('http://localhost://',banner[0].image)
    res.cookie('sessionID',req.sessionID,{httpOnly:true,secure:true,})
    res.redirect('/')
})
router.get('/scheduler',(req,res)=>{
    res.render('scheduler.html')
})
router.get('/header',(req,res)=>{
    res.render('header.html')
})

module.exports = router