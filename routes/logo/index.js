const express = require('express');
const router = express.Router();
const logoController = require('./logoController.js');

router.get('/logo',logoController.logo)

module.exports = router