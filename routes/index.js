const express = require('express')
const { route } = require('./user')
const router = express.Router()
const userRouter = require('./user/index.js')
const collegeRouter = require('./college/index.js')
const communityRouter = require('./community/index.js')
const consultRouter = require('./consult/index.js')
const curriculumRouter = require('./curriculum/index.js')
const jobRouter =require('./job/index.js')


router.use('/user',userRouter)
router.use('/college',collegeRouter)
router.use('/community',communityRouter)
router.use('/consult',consultRouter)
router.use('/curriculum',curriculumRouter)
router.use('/job',jobRouter)

router.get('/',(req,res)=>{
    res.render('main.html')
})
router.get('/scheduler',(req,res)=>{
    res.render('scheduler.html')
})
router.get('/header',(req,res)=>{
    res.render('header.html')
})

module.exports = router