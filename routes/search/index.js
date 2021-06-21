const express = require('express')
const router = express.Router()
const searchController = require('./searchController.js')

router.get('/search',searchController.search)
