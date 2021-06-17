const express = require('express')
const router = express.Router()
const jobController = require('./jobController.js')
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'public/uploads/')
    },
    filename:function(req,file,callback){
      callback(null,new Date().valueOf() + '.png')
    }
  })
  const upload = multer({storage: storage})
 
router.get('/interview',jobController.interview)
router.get('/portfolio',jobController.portfolio)
router.get('/recruit',jobController.recruit)
router.get('/interviewPost',upload.single('img'),jobController.interviewPost);


module.exports = router