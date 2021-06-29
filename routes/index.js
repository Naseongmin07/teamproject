const express = require('express')
const { route } = require('./user')
const router = express.Router()
const userRouter = require('./user/index.js')
const collegeRouter = require('./college/index.js')
const communityRouter = require('./community/index.js')
const consultRouter = require('./consult/index.js')
const curriculumRouter = require('./curriculum/index.js')
const jobRouter =require('./job/index.js')
const chatRouter = require('./chat/index.js')
const indexRouter = require('./routers/index.js')
const {Mainvisual} = require('../models') 
// const searchRouter = require('./search/index.js')


router.use('/user',userRouter)
router.use('/college',collegeRouter)
router.use('/community',communityRouter)
router.use('/consult',consultRouter)
router.use('/curriculum',curriculumRouter)
router.use('/job',jobRouter)
router.use('/chat',chatRouter)
router.use('/admin/login_on',indexRouter)
router.use('/admin',(req,res)=>{
    console.log(req.sessionID)
    res.cookie('sessionID',req.sessionID,{httpOnly:true,secure:true,})
    res.render('./login.html')
})
// router.use('/search',searchRouter)

router.get('/',async (req,res)=>{
    let ress = await Mainvisual.findAll({where:{
        watchaut:1
    }})
    console.log(ress)
    res.cookie('sessionID',req.sessionID,{httpOnly:true,secure:true,})
    res.render('main.html')
})
router.get('/scheduler',(req,res)=>{
    res.render('scheduler.html')
})
router.get('/header',(req,res)=>{
    res.render('header.html')
})

module.exports = router