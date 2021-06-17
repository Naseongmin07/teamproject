
const express = require('express');
const router = express.Router();
const chatController = require('./chatController.js');

router.get('/chat',chatController.chat)

module.exports = router