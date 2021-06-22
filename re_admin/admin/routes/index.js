const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth.js')
const indexRouter = require('./routers/index.js')

router.use('/admin/login_on',indexRouter)
router.use('/admin',auth,(req,res)=>{
    res.render('./login.html')
})

module.exports = router