const express = require('express');
const router = express.Router();
const testController = require('./testController.js');

router.get('/test',testController.test)

module.exports = router